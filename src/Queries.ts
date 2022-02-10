import { useDataEngine } from "@dhis2/app-runtime";
import { fromPairs, groupBy } from "lodash";
import { useQuery } from "react-query";
import * as XLSX from "xlsx";
import { changeProgram, changeTotal, changeTypes, changeUsers } from "./Events";
import {
  enrollmentCountsGroupByDistricts,
  eventCountsGroupByDistrict,
} from "./utils";

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
      dataSets: { dataSets },
      programs: { programs },
      users: { users },
    }: any = await engine.query(query);
    const allUsers = users.map((u: any) => [
      u.userCredentials.username,
      { displayName: u.displayName, phoneNumber: u.phoneNumber },
    ]);
    changeUsers(fromPairs(allUsers))
    changeTypes({ programs, dataSets, organisationUnits });
    return true;
  });
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

export function useEnrollmentOUCount(
  page = 1,
  pageSize = 10,
  startDate = "",
  endDate = ""
) {
  const engine = useDataEngine();

  let params: any = {
    fields: "id,name",
    page,
    pageSize,
    level: 3,
  };

  const queryString = {
    units: {
      resource: `organisationUnits.json`,
      params,
    },
  };
  return useQuery<any, Error>(
    ["count by organisations", page, pageSize, startDate, endDate],
    async () => {
      const {
        units: { organisationUnits, pager },
      }: any = await engine.query(queryString);
      const { total } = pager;
      changeTotal(total);

      const mutation: any = {
        type: "create",
        resource: "metadata",
        data: {
          sqlViews: [
            enrollmentCountsGroupByDistricts(startDate, endDate),
            eventCountsGroupByDistrict(startDate, endDate),
          ],
        },
      };
      await engine.mutate(mutation);
      const sqlViewQuery = {
        kVTqe77I6oC: {
          resource: `sqlViews/kVTqe77I6oC/data`,
          params: {
            paging: false,
          },
        },
        kbc1rIMGkJb: {
          resource: `sqlViews/kbc1rIMGkJb/data`,
          params: {
            paging: false,
          },
        },
      };

      const {
        kVTqe77I6oC: {
          listGrid: { rows: enrollments },
        },
        kbc1rIMGkJb: {
          listGrid: { rows: events },
        },
      }: any = await engine.query(sqlViewQuery);

      const groupedEnrollment = fromPairs(enrollments);
      const groupedEvents = groupBy(
        events.map((e: any) => {
          return { ou: e[0], status: e[1], value: e[2] };
        }),
        "ou"
      );
      return organisationUnits.map((u: any) => {
        let currentUser = u;
        const userEnrollments = groupedEnrollment[u.id];
        const userEvents = groupedEvents[u.id];
        if (userEnrollments) {
          currentUser = { ...currentUser, enrollments: userEnrollments };
        } else {
          currentUser = { ...currentUser, enrollments: 0 };
        }
        let unCompletedEvents = 0;
        let completedEvents = 0;
        if (userEvents) {
          const completed = userEvents.find(
            ({ status }: any) => status === "COMPLETED"
          );
          const active = userEvents.find(
            ({ status }: any) => status === "ACTIVE"
          );
          if (active) {
            unCompletedEvents = Number(active.value);
          }
          if (completed) {
            completedEvents = Number(completed.value);
          }
          currentUser = {
            ...currentUser,
            events: completedEvents + unCompletedEvents,
            completed: completedEvents,
          };
        } else {
          currentUser = { ...currentUser, events: 0, completed: 0 };
        }
        return currentUser;
      });
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
