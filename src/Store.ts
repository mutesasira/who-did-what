import { domain } from './Domains';
import { changeTotal, changePeriod } from "./Events";
import { Store } from './interfaces';

export const $store = domain.createStore<Store>({
  loading: false,
  total: 0,
  period: [{ id: "LAST_YEAR", name: "Last Year" }],
}).on(changeTotal, (state, total) => {
  return { ...state, total }
})
.on(changePeriod, (state, period: any[]) => {
  return { ...state, period }
});