import { domain } from './Domains';

export const changeTotal = domain.createEvent<number>();
export const changePeriod = domain.createEvent<any[]>("change period");