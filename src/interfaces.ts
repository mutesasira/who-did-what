export interface Item {
  programs: any; dataElements: any;
  programStages: any; id: string, name: string, trackedEntityType?: { id: string }, trackedEntityAttribute?: { id: string }
}

export interface Program {
  id: string;
  name: string;
  programType: string;

}
export interface DataSet {
  id: string;
  name: string;

}
export interface Store {
  loading: boolean;
  total: number;
  period: any[];
  ou: any[];
  programs: Program[];
  dataSets: DataSet[];
  program: any;
  stage: string;
  attribute: string;
}
export interface ProgramSetting {
  program: string;
}