export const enrollmentCounts = (
  logins: string,
  startDate: string,
  endDate: string
) => {
  const dateQuery = startDate && endDate ? `and created between '${startDate}' and '${endDate}'` : "";
  return {
    type: "QUERY",
    "publicAccess": "rwrw----",
    "access": {
      "read": true,
      "update": true,
      "externalize": true,
      "delete": true,
      "write": true,
      "manage": true,
      "data": {
        "read": true,
        "write": true
      }
    },
    "sharing": {
      "owner": "w29gG6lD26U",
      "external": false,
      "users": {

      },
      "userGroups": {

      },
      "public": "rwrw----"
    },
    id: "kIEqe77I6oC",
    sqlQuery: `select storedby,COUNT(programinstanceid) from programinstance where storedby in (${logins}) ${dateQuery} group by storedby;`,
    description: "Query Enrollments by Users",
    name: "Enrollments Per Person",
    cacheStrategy: "NO_CACHE",
  };
};
export const eventCounts = (
  logins: string,
  startDate: string,
  endDate: string
) => {
  const dateQuery = startDate && endDate ? `and created between '${startDate}' and '${endDate}'` : "";
  return {
    type: "QUERY",
    "publicAccess": "rwrw----",
    "access": {
      "read": true,
      "update": true,
      "externalize": true,
      "delete": true,
      "write": true,
      "manage": true,
      "data": {
        "read": true,
        "write": true
      }
    },
    "sharing": {
      "owner": "w29gG6lD26U",
      "external": false,
      "users": {

      },
      "userGroups": {

      },
      "public": "rwrw----"
    },
    id: "kCt1rIMGkJb",
    sqlQuery: `select storedby,COUNT(programstageinstanceid) from programstageinstance where storedby in (${logins}) ${dateQuery} group by storedby;`,
    description: "Events Per Person",
    name: "Events Per Person",
    cacheStrategy: "NO_CACHE",
  };
};
