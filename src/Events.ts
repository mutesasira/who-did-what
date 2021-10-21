import { domain } from './Domains';
import { Item } from './interfaces';

export const changeTotal = domain.createEvent<number>();
export const changeTrackedEntityType = domain.createEvent<string>();
export const changeTypes = domain.createEvent<{ programs: Item[], trackedEntityTypes: Item[], dataSets: Item[] }>()
