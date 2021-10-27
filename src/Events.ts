import { domain } from './Domains';
import { Item } from './interfaces';

export const changeTotal = domain.createEvent<number>();
export const changePeriod = domain.createEvent<any[]>("change period");
export const newOu = domain.createEvent<any[]>("change OrgUnit");
export const changeTrackedEntityType = domain.createEvent<string>();
export const changeDataElement = domain.createEvent<string>();
export const changeTrackedEntityAttributes = domain.createEvent<string>();
export const changeTypes = domain.createEvent<{
  programs: Item[],
  trackedEntityTypes: Item[],
  dataSets: Item[],
  programStages: Item[],
  trackedEntityAttributes: Item[],
  dataElements: Item[],
}>()