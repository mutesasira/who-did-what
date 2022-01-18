import { isEmpty } from 'lodash';
import { domain } from './Domains';
import { changeTotal, changeTrackedEntityType, changeTypes, newOu, changePeriod, changeTrackedEntityAttributes, changeDataElement, changeProgram, changeStage, changeAttribute, changeDistrict } from "./Events";
import { Store } from './interfaces';

export const $store = domain.createStore<Store>({
  loading: false,
  total: 0,
  ou: [],
  period: [{ id: "LAST_YEAR", name: "Last Year" }],
  programs: [],
  dataSets: [],
  program: {},
  orgUnits:[],
  stage: '',
  attribute: ''
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
  .on(changeStage, (state, stage) => {
    return { ...state, stage }
  })
  .on(changeAttribute, (state, attribute) => {
    return { ...state, attribute }
  })
  .on(changeTrackedEntityAttributes, (state, trackedEntityAttribute) => {
    return { ...state, trackedEntityAttribute }
  })
  .on(changeTypes, (state, { programs, dataSets }) => {
    return {
      ...state,
      programs,
      dataSets
    }
  }).on(changeProgram, (state, program) => {
    return {
       ...state, program 
    }
  }).on(changeDistrict, (state, Orgunit) => {
    return { ...state, Orgunit }
  });

export const $trackerPrograms = $store.map(({ programs }) => {
  return programs.filter((item) => item.programType === 'WITH_REGISTRATION')
});

export const $eventPrograms = $store.map(({ programs }) => {
  return programs.filter((item) => item.programType === 'WITHOUT_REGISTRATION')
});

export const $attributes = $store.map(({ program }) => {
  if (!isEmpty(program)) {
    return program.programTrackedEntityAttributes.map((tea: any) => tea.trackedEntityAttribute)
  }
  return []
});

export const $stages = $store.map(({ program }) => {
  if (!isEmpty(program)) {
    return program.programStages
  }
  return []
});

export const $dataElements = $store.map(({ program, stage }) => {
  if (!isEmpty(program)) {
    const foundStage = program.programStages.find((ps: any) => ps.id === stage);
    if (foundStage) {
      return foundStage.programStageDataElements.map((psde: any) => psde.dataElement)
    }
  }
  return []
});


