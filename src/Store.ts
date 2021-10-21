import { domain } from './Domains';
import { changeTotal, changeTrackedEntityType, changeTypes,newOu } from "./Events";
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
});