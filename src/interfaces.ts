export interface Item {
  programs: any; dataElements: any;
  programStages: any; id: string, name: string, trackedEntityType?: { id: string }, trackedEntityAttribute?: { id: string } 
}
export interface Store {
  loading: boolean;
  total: number;
  period: any[];
  ou: any[];
  trackedEntityType: string;
  trackedEntityTypes: Item[];
  programs: Item[];
  dataSets: Item[];
  programStages: Item[];
}
export interface ProgramSetting {
  program: string;
}