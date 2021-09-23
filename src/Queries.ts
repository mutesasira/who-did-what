import { useQuery } from "react-query";
import { changeTotal } from "./Events";
import { enrollmentCounts } from "./utils";

export function useLoader(d2: any) {
  const api = d2.Api.getApi();
  return useQuery<any, Error>("sqlViews", async () => {
    await api.post('metadata', { sqlViews: [enrollmentCounts] });
    return true
  });
}

export async function fetchSqlView(d2: any, sqlViewId: string, page = 1) {
  const api = d2.Api.getApi();
  return await api.get(`sqlViews/${sqlViewId}/data`, { page, pageSize: 10 });
}

export function useEnrollmentCount(d2: any, sqlViewId: string, page = 1) {
  return useQuery<any, Error>(["sqlViews", page], async () => {
    const { listGrid: { headers, rows }, pager: { total } } = await fetchSqlView(d2, sqlViewId, page);
    changeTotal(total)
    return {
      headers, rows
    }
  });
}