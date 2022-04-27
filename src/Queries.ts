import { useDataEngine } from "@dhis2/app-runtime";
import { fromPairs, isEmpty } from "lodash";
import { useQuery } from "react-query";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  changeDistricts,
  changeProgram,
  changeTotal,
  changeTypes,
  changeUsers,
} from "./Events";
import { Indicator } from "./interfaces";

export const api = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "https://services.dhis2.hispuganda.org/",
});

export function useLoader() {
  const engine = useDataEngine();
  const query = {
    dataSets: {
      resource: "dataSets.json",
      params: {
        fields: "id,name",
        paging: false,
      },
    },
    districts: {
      resource: "organisationUnits.json",
      params: {
        fields: "id,name",
        paging: false,
        level: 3,
      },
    },
    me: {
      resource: "me.json",
      params: {
        fields: "organisationUnits[id,name]",
        paging: false,
      },
    },
    users: {
      resource: "users",
      params: {
        userOrgUnits: "true",
        fields: "phoneNumber,displayName,userCredentials[username]",
        includeChildren: "true",
        paging: "false",
      },
    },
    programs: {
      resource: "programs.json",
      params: {
        paging: false,
        fields: "id,name,programType,trackedEntityType",
      },
    },
  };
  return useQuery<any, Error>("initial", async () => {
    const {
      me: { organisationUnits },
      districts: { organisationUnits: ds },
      dataSets: { dataSets },
      programs: { programs },
      users: { users },
    }: any = await engine.query(query);
    const allUsers = users.map((u: any) => [
      u.userCredentials.username,
      { displayName: u.displayName, phoneNumber: u.phoneNumber },
    ]);
    changeDistricts(fromPairs(ds.map((d: any) => [d.id, d.name])));
    changeUsers(fromPairs(allUsers));
    changeTypes({ programs, dataSets, organisationUnits });
    return true;
  });
}

export function useDoses(organisationUnits: string[]) {
  return useQuery<any, Error>(["es-doses"], async () => {
    let must: any[] = [
      {
        bool: {
          should: [
            { terms: { "path.national": organisationUnits } },
            { terms: { "path.region": organisationUnits } },
            { terms: { "path.district": organisationUnits } },
            { terms: { "path.subcounty": organisationUnits } },
            { terms: { "path.facility": organisationUnits } },
          ],
        },
      },
      { terms: { status: ["active", "completed"] } },
      {
        match: {
          deleted: false,
        },
      },
      {
        exists: {
          field: "dose",
        },
      },
      {
        exists: {
          field: "vaccine",
        },
      },
    ];
    const query = {
      index: "programstageinstance",
      query: {
        bool: {
          must,
        },
      },
      aggs: {
        summary: {
          terms: {
            field: "dose.keyword",
            size: 10000,
          },
        },
      },
    };
    const { data }: any = await api.post("wal", query);
    return data;
  });
}

export function useDashboard(organisationUnits: string[]) {
  const engine = useDataEngine();
  let query: any = {
    campaign: {
      resource: `sqlViews/PgPX6SXZmzV/data?var=parent:${organisationUnits[0]}&paging=false`,
    },
    daily: {
      resource: `sqlViews/s5bKRhYXFCJ/data?var=parent:${organisationUnits[0]}&paging=false`,
    },
  };

  const lowerUnits = organisationUnits.map((u) => u.toLowerCase());

  let must: any[] = [
    {
      bool: {
        should: [
          { terms: { "path.national": lowerUnits } },
          { terms: { "path.region": lowerUnits } },
          { terms: { "path.district": lowerUnits } },
          { terms: { "path.subcounty": lowerUnits } },
          { terms: { "path.facility": lowerUnits } },
        ],
      },
    },
    { terms: { status: ["active", "completed"] } },
    {
      match: {
        deleted: false,
      },
    },
    {
      exists: {
        field: "dose",
      },
    },
    {
      exists: {
        field: "vaccine",
      },
    },
  ];

  const otherQuery = {
    index: "programstageinstance",
    query: {
      bool: {
        must,
      },
    },
    aggs: {
      summary: {
        terms: {
          field: "dose.keyword",
          size: 10000,
        },
      },
    },
  };

  return useQuery<any, Error>(
    ["query"],
    async () => {
      const [
        {
          campaign: {
            listGrid: { rows: cRows },
          },
          daily: {
            listGrid: { rows: dRows },
          },
        },
        {
          data: { summary },
        },
      ]: any[] = await Promise.all([
        engine.query(query),
        api.post("wal", otherQuery),
      ]);
      const campaignData = fromPairs(cRows);
      const dailyData = fromPairs(dRows);
      return {
        individual: fromPairs(
          summary.buckets.map((b: any) => [b.key, b.doc_count])
        ),
        campaignData,
        dailyData,
      };
    },
    {
      refetchInterval: 1000 * 10,
    }
  );
}

export function useDistricts(
  organisationUnits: string[],
  startDate = "",
  endDate = "",
  username = ""
) {
  return useQuery<any, Error>(
    ["es", startDate, endDate, username],
    async () => {
      if (startDate && endDate) {
        let must: any[] = [
          {
            range: {
              created: {
                lte: endDate,
                gte: startDate,
              },
            },
          },
          {
            bool: {
              should: [
                { terms: { "path.national": organisationUnits } },
                { terms: { "path.region": organisationUnits } },
                { terms: { "path.district": organisationUnits } },
                { terms: { "path.subcounty": organisationUnits } },
                { terms: { "path.facility": organisationUnits } },
              ],
            },
          },
          { terms: { status: ["active", "completed"] } },
          {
            match: {
              deleted: false,
            },
          },
          {
            exists: {
              field: "dose",
            },
          },
          {
            exists: {
              field: "vaccine",
            },
          },
        ];

        if (username) {
          must = [
            ...must,
            {
              match: {
                storedby: String(username).toLowerCase(),
              },
            },
          ];
        }
        
        const query = {
          index: "programstageinstance",
          query: {
            bool: {
              must,
            },
          },
          aggs: {
            summary: {
              terms: {
                field: "path.district.keyword",
                size: 10000,
              },
              aggs: {
                status: {
                  terms: {
                    field: "status.keyword",
                  },
                },
              },
            },
          },
        };
        const { data }: any = await api.post("wal", query);
        return data;
      }
      return { summary: { buckets: [] } };
    }
  );
}

export function useEs(
  q: string = "",
  startDate = "",
  endDate = "",
  organisationUnits: string[]
) {
  return useQuery<any, Error>(
    ["es", q, startDate, endDate, ...organisationUnits],
    async () => {
      if (startDate && endDate) {
        let must: any[] = [
          {
            range: {
              created: {
                lte: endDate,
                gte: startDate,
              },
            },
          },
          {
            bool: {
              should: [
                { terms: { "path.national": organisationUnits } },
                { terms: { "path.region": organisationUnits } },
                { terms: { "path.district": organisationUnits } },
                { terms: { "path.subcounty": organisationUnits } },
                { terms: { "path.facility": organisationUnits } },
              ],
            },
          },
          { terms: { status: ["active", "completed"] } },
          {
            match: {
              deleted: false,
            },
          },
          {
            exists: {
              field: "dose",
            },
          },
          {
            exists: {
              field: "vaccine",
            },
          },
        ];
        if (q) {
          must = [
            ...must,
            {
              match: {
                storedby: String(q).toLowerCase(),
              },
            },
          ];
        }
        const query = {
          index: "programstageinstance",
          query: {
            bool: {
              must,
            },
          },
          aggs: {
            summary: {
              terms: {
                field: "storedby.keyword",
                size: 10000,
              },
              aggs: {
                status: {
                  terms: {
                    field: "status.keyword",
                  },
                },
              },
            },
          },
        };
        const { data }: any = await api.post("wal", query);
        return data;
      }
      return { summary: { buckets: [] } };
    }
  );
}

export function useProgram(programId: string) {
  const engine = useDataEngine();
  const query = {
    program: {
      resource: `programs/${programId}.json`,
      params: {
        paging: false,
        fields:
          "id,name,programTrackedEntityAttributes[id,trackedEntityAttribute[id,name]],programType,trackedEntityType,programStages[id,name,programStageDataElements[id,dataElement[id,name]]]",
      },
    },
  };
  return useQuery<any, Error>(["program", programId], async () => {
    const { program }: any = await engine.query(query);
    changeProgram(program);
    return true;
  });
}

export async function fetchSqlView(sqlViewId: string) {
  const engine = useDataEngine();
  const query = {
    data: {
      resource: `sqlViews/${sqlViewId}/data`,
      params: {
        paging: false,
      },
    },
  };
  const { data }: any = await engine.query(query);
  return data;
}

export function useSQLView(
  page = 1,
  pageSize = 10,
  sqlView: string,
  startDate = "",
  endDate = "",
  organisations: string[] = [],
  username: string = ""
) {
  const engine = useDataEngine();
  return useQuery<any, Error>(
    ["users", sqlView, page, pageSize, startDate, endDate, username],
    async () => {
      if (startDate && endDate) {
        const queries = [
          `var=start:${startDate}`,
          `var=end:${endDate}`,
          `var=units:${organisations.map((o: any) => o.id).join("-")}`,
          `var=username:${username === "" ? " " : username}`,
          `page=${page}`,
          `pageSize=${pageSize}`,
        ].join("&");

        const sqlViewQuery = {
          data: {
            resource: `sqlViews/${sqlView}/data?${queries}`,
          },
        };
        const { data }: any = await engine.query(sqlViewQuery);
        const {
          pager: { total },
        } = data;
        changeTotal({ [sqlView]: total });
        return data;
      }
      return { listGrid: { rows: [] } };
    }
  );
}

export async function download(
  sqlView: string,
  startDate = "",
  endDate = "",
  organisations: string[] = [],
  username: string = ""
) {
  const engine = useDataEngine();
  const queries = [
    `var=start:${startDate}`,
    `var=end:${endDate}`,
    `var=units:${organisations.map((o: any) => o.id).join("-")}`,
    `var=username:${username === "" ? " " : username}`,
    `paging=false`,
  ].join("&");

  const sqlViewQuery = {
    data: {
      resource: `sqlViews/${sqlView}/data?${queries}`,
    },
  };
  const {
    data: {
      listGrid: { rows, headers },
    },
  }: any = await engine.query(sqlViewQuery);

  const all = [headers.map((h: any) => h.name), ...rows];
  const sheetName = "Events";
  const filename = `Events-${organisations.join("-")}-${startDate}-${endDate}`;
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(all);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}

export function useSqlViewOus(startDate = "", endDate = "") {
  const engine = useDataEngine();

  let params: any = {
    fields: "id,name",
    paging: "false",
    level: 3,
  };
  const queries = [`var=start:${startDate}`, `var=end:${endDate}`].join("&");

  const queryString = {
    units: {
      resource: `organisationUnits.json`,
      params,
    },
    events: { resource: `sqlViews/kbc1rIMGkJb/data?${queries}` },
    enrollments: { resource: `sqlViews/kVTqe77I6oC/data?${queries}` },
  };
  return useQuery<any, Error>(
    ["count by organisations", startDate, endDate],
    async () => {
      const {
        units: { organisationUnits },
        events: {
          listGrid: { rows: events },
        },
        enrollments: {
          listGrid: { rows: enrollments },
        },
      }: any = await engine.query(queryString);

      return { events };
    }
  );
}

export function useTEA(program: string, attribute: string, value: string) {
  const engine = useDataEngine();
  const query = {
    instances: {
      resource: `trackedEntityInstances.json`,
      params: {
        paging: false,
        ouMode: "ALL",
        program,
        filter: `${attribute}:eq:${value}`,
      },
    },
  };
  return useQuery<any, Error>(
    ["instances", program, attribute, value],
    async () => {
      const {
        instances: { trackedEntityInstances },
      }: any = await engine.query(query);
      return trackedEntityInstances.map((tei: any) => {
        return tei.attributes.find((a: any) => a.attribute === attribute);
      });
    },
    {
      enabled: !!program && !!attribute && !!value,
    }
  );
}

export function useTEI(program: string, value: string) {
  const engine = useDataEngine();
  const query = {
    instance: {
      resource: `trackedEntityInstances/${value}.json`,
      params: {
        ouMode: "ALL",
        program,
      },
    },
  };
  return useQuery<any, Error>(
    ["instances", program, value],
    async () => {
      try {
        const { instance }: any = await engine.query(query);
        return instance;
      } catch (error) {
        return "Nothing found";
      }
    },
    {
      enabled: !!program && !!value,
    }
  );
}
