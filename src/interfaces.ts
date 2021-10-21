export interface Item { id: string, name: string, trackedEntityType?: { id: string } }
export interface Store {
  loading: boolean;
  total: number;
  period: any[];
  ou: any[];
  trackedEntityType: string;
  trackedEntityTypes: Item[];
  programs: Item[];
  dataSets: Item[];
}
export interface ProgramSetting {
  program: string;
}