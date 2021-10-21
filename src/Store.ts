import { domain } from './Domains';
import { changeTotal, changeTrackedEntityType, changeTypes } from "./Events";
import { Store } from './interfaces';

export const $store = domain.createStore<Store>({
  loading: false,
  total: 0,
  trackedEntityType: '',
  trackedEntityTypes: [],
  programs: [],
  dataSets: []
}).on(changeTotal, (state, total) => {
  return { ...state, total }
}).on(changeTrackedEntityType, (state, trackedEntityType) => {
  return { ...state, trackedEntityType }
}).on(changeTypes, (state, { programs, trackedEntityTypes, dataSets }) => {
  return {
    ...state,
    programs,
    trackedEntityTypes,
    dataSets
  }
});

export const $trackedEntityTypePrograms = $store.map(({ trackedEntityType, programs }) => {
  return programs.filter((item) => item.trackedEntityType?.id === trackedEntityType)
})