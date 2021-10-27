import { domain } from './Domains';
import { changeTotal, changeTrackedEntityType, changeTypes, newOu, changePeriod, changeTrackedEntityAttributes, changeDataElement } from "./Events";
import { Store } from './interfaces';

export const $store = domain.createStore<Store>({
  loading: false,
  total: 0,
  ou: [],
  period: [{ id: "LAST_YEAR", name: "Last Year" }],
  trackedEntityType: '',
  trackedEntityTypes: [],
  programs: [],
  dataSets: [],
  programStages: [],
  
})
  .on(changeTotal, (state, total) => {
    return { ...state, total }
  })
  .on(newOu, (state, ou: any[]) => {
    return { ...state, ou }
  })
  .on(changePeriod, (state, period: any[]) => {
    return { ...state, period }
  })
  .on(changeTrackedEntityType, (state, trackedEntityType) => {
    return { ...state, trackedEntityType }
  })
  .on(changeDataElement, (state, dataElement) => {
    return { ...state, dataElement }
  })
  .on(changeTrackedEntityAttributes, (state, trackedEntityAttribute) => {
    return { ...state, trackedEntityAttribute }
  })
  .on(changeTypes, (state, { programs, trackedEntityTypes, dataSets, programStages, trackedEntityAttributes,dataElements }) => {
    return {
      ...state,
      programs,
      dataElements,
      trackedEntityTypes,
      dataSets,
      programStages,
      trackedEntityAttributes
    }
  });

export const $trackedEntityTypePrograms = $store.map(({ trackedEntityType, programs }) => {
  return programs.filter((item) => item.trackedEntityType?.id === trackedEntityType)
});

export const $programStage = $store.map(({ programs, programStages }) => {
  return programStages.filter((item) => item.programs?.id === programs)
});