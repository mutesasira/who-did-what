import { groupBy, sum } from "lodash";

export const enrollmentCounts = (
  logins: string,
  startDate: string,
  endDate: string
) => {
  const dateQuery =
    startDate && endDate
      ? `and date(created) between '${startDate}' and '${endDate}'`
      : "";
  return {
    type: "QUERY",
    publicAccess: "rwrw----",
    access: {
      read: true,
      update: true,
      externalize: true,
      delete: true,
      write: true,
      manage: true,
      data: {
        read: true,
        write: true,
      },
    },
    sharing: {
      owner: "w29gG6lD26U",
      external: false,
      users: {},
      userGroups: {},
      public: "rwrw----",
    },
    id: "kIEqe77I6oC",
    sqlQuery: `select storedby,COUNT(programinstanceid) from programinstance where storedby in (${logins}) ${dateQuery} and deleted = false group by storedby;`,
    description: "Query Enrollments by Users",
    name: "Enrollments Per Person",
    cacheStrategy: "NO_CACHE",
  };
};
export const enrollmentCountsGroupByDistricts = (
  startDate: string,
  endDate: string
) => {
  const dateQuery =
    startDate && endDate
      ? `and date(pi.created) between '${startDate}' and '${endDate}'`
      : "";
  return {
    type: "QUERY",
    publicAccess: "rwrw----",
    access: {
      read: true,
      update: true,
      externalize: true,
      delete: true,
      write: true,
      manage: true,
      data: {
        read: true,
        write: true,
      },
    },
    sharing: {
      owner: "w29gG6lD26U",
      external: false,
      users: {},
      userGroups: {},
      public: "rwrw----",
    },
    id: "kVTqe77I6oC",
    sqlQuery: `select split_part(o.path, '/', 4) as ou,COUNT(pi.programinstanceid) from programinstance pi 
    inner join organisationunit o using(organisationunitid)
    where deleted = false ${dateQuery} group by ou;`,

    description: "Query Enrollments by Districts",
    name: "Enrollments Per District",
    cacheStrategy: "NO_CACHE",
  };
};
export const eventCounts = (
  logins: string,
  startDate: string,
  endDate: string
) => {
  const dateQuery =
    startDate && endDate
      ? `and date(created) between '${startDate}' and '${endDate}'`
      : "";
  return {
    type: "QUERY",
    publicAccess: "rwrw----",
    access: {
      read: true,
      update: true,
      externalize: true,
      delete: true,
      write: true,
      manage: true,
      data: {
        read: true,
        write: true,
      },
    },
    sharing: {
      owner: "w29gG6lD26U",
      external: false,
      users: {},
      userGroups: {},
      public: "rwrw----",
    },
    id: "kCt1rIMGkJb",
    sqlQuery: `select storedby,status,COUNT(*) from (select programstageinstanceid,storedby,eventdatavalues->'bbnyNYD1wgS'->>'value' as vaccine,eventdatavalues->'LUIsbsm3okG'->>'value' as dose,status from programstageinstance where storedby in (${logins}) ${dateQuery} and deleted = false) psi  where psi.vaccine is not null and psi.dose is not null group by storedby,status;`,
    description: "Events Per Person",
    name: "Events Per Person",
    cacheStrategy: "NO_CACHE",
  };
};

export const eventCountsGroupByDistrict = (
  startDate: string,
  endDate: string
) => {
  const dateQuery =
    startDate && endDate
      ? `and date(pi.created) between '${startDate}' and '${endDate}'`
      : "";
  return {
    type: "QUERY",
    publicAccess: "rwrw----",
    access: {
      read: true,
      update: true,
      externalize: true,
      delete: true,
      write: true,
      manage: true,
      data: {
        read: true,
        write: true,
      },
    },
    sharing: {
      owner: "w29gG6lD26U",
      external: false,
      users: {},
      userGroups: {},
      public: "rwrw----",
    },
    id: "kbc1rIMGkJb",
    sqlQuery: `select split_part(o.path, '/', 4) as ou,pi.status,COUNT(pi.programstageinstanceid) from programstageinstance pi inner join organisationunit o using(organisationunitid) where deleted = false ${dateQuery} and eventdatavalues#>>'{bbnyNYD1wgS, value}'  is not null and eventdatavalues#>>'{LUIsbsm3okG, value}'  is not null group by ou,status;`,
    description: "Events Per District",
    name: "Events Per District",
    cacheStrategy: "NO_CACHE",
  };
};

export const processEvents = ({ listGrid: { rows, headers } }: any) => {
  const groupedEvents = groupBy(
    rows.map((e: any) => {
      return { username: e[0], status: e[1], value: Number(e[2]) };
    }),
    "username"
  );

  return Object.entries(groupedEvents).map(([username, data]) => {
    return { username, events: sum(data.map((d) => d.value)) };
  });
};
