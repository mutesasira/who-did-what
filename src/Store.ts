import { domain } from './Domains';
import { changeTotal, changePeriod, newOu } from "./Events";
import { Store } from './interfaces';

export const $store = domain.createStore<Store>({
  loading: false,
  total: 0,
  ou: [],
  period: [{ id: "LAST_YEAR", name: "Last Year" }],
})
  .on(changeTotal, (state, total) => {
  return { ...state, total }
})
.on(newOu, (state, ou: any[]) => {
  return { ...state, ou }
})
.on(changePeriod, (state, period: any[]) => {
  return { ...state, period }
});