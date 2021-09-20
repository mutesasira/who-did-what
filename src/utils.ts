export const enrollmentCounts = {
  type: "QUERY",
  id: "kIEqe77I6oC",
  sqlQuery: "select storedby,COUNT(programinstanceid) from programinstance group by storedby;",
  description: "Query Enrollments by Users",
  name: "Enrollments Per Person",
  cacheStrategy: "NO_CACHE"
};