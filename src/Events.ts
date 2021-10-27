import { domain } from './Domains';
import { DataSet, Program } from './interfaces';

export const changeTotal = domain.createEvent<number>();
export const changePeriod = domain.createEvent<any[]>("change period");
export const newOu = domain.createEvent<any[]>("change OrgUnit");
export const changeTrackedEntityType = domain.createEvent<string>();
export const changeDataElement = domain.createEvent<string>();
export const changeProgram = domain.createEvent<any>();
export const changeTrackedEntityAttributes = domain.createEvent<string>();
export const changeStage = domain.createEvent<string>();
export const changeAttribute = domain.createEvent<string>();
export const changeTypes = domain.createEvent<{
  programs: Program[],
  dataSets: DataSet[]
}>();
