import { domain } from './Domains';
import { changeTotal } from "./Events";
import { Store } from './interfaces';

export const $store = domain.createStore<Store>({
  loading: false,
  total: 0
}).on(changeTotal, (state, total) => {
  return { ...state, total }
});