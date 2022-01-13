import { useDataEngine } from "@dhis2/app-runtime";
import { fromPairs, groupBy } from "lodash";
import { useQuery } from "react-query";
import { changeProgram, changeTotal, changeTypes } from "./Events";
import { enrollmentCounts, eventCounts } from "./utils";

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
      dataSets: { dataSets },
      programs: { programs },
    }: any = await engine.query(query);
    changeTypes({ programs, dataSets });
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

export function useEnrollmentCount(
  page = 1,
  pageSize = 10,
  query = "",
  startDate = "",
  endDate = ""
) {
  const engine = useDataEngine();

  let params: any = {
    fields:
      "phoneNumber,displayName,userCredentials[username,created,lastLogin,createdBy[displayName],lastUpdatedBy[displayName]]",
    page,
    pageSize,
  };
  if (query) {
    params = { ...params, query };
  }
  const queryString = {
    users: {
      resource: `users.json`,
      params,
    },
  };
  return useQuery<any, Error>(
    ["users", page, pageSize, query, startDate, endDate],
    async () => {
      const {
        users: { users, pager },
      }: any = await engine.query(queryString);
      const { total } = pager;
      const usernames = users
        .map((u: any) => `'${u.userCredentials.username}'`)
        .join(",");
      const mutation: any = {
        type: "create",
        resource: "metadata",
        data: {
          sqlViews: [
            enrollmentCounts(usernames, startDate, endDate),
            eventCounts(usernames, startDate, endDate),
          ],
        },
      };
      await engine.mutate(mutation);
      const sqlViewQuery = {
        kIEqe77I6oC: {
          resource: `sqlViews/kIEqe77I6oC/data`,
          params: {
            paging: false,
          },
        },
        kCt1rIMGkJb: {
          resource: `sqlViews/kCt1rIMGkJb/data`,
          params: {
            paging: false,
          },
        },
      };

      const {
        kIEqe77I6oC: {
          listGrid: { rows: enrollments },
        },
        kCt1rIMGkJb: {
          listGrid: { rows: events },
        },
      }: any = await engine.query(sqlViewQuery);

      const groupedEnrollment = fromPairs(enrollments);
      const groupedEvents = groupBy(
        events.map((e: any) => {
          return { username: e[0], status: e[1], value: e[2] };
        }),
        "username"
      );
      return users.map((u: any) => {
        let currentUser = u;
        const userEnrollments = groupedEnrollment[u.userCredentials.username];
        const userEvents = groupedEvents[u.userCredentials.username];
        if (userEnrollments) {
          currentUser = { ...currentUser, enrollments: userEnrollments };
        } else {
          currentUser = { ...currentUser, enrollments: 0 };
        }
        if (userEvents) {
          const completed = userEvents.find(
            ({ status }: any) => status === "COMPLETED"
          );
          const active = userEvents.find(
            ({ status }: any) => status === "ACTIVE"
          );
          currentUser = {
            ...currentUser,
            events: active ? active.value : 0,
            completed: completed ? completed.value : 0,
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
