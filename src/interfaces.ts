export interface Item {
  programs: any;
  dataElements: any;
  programStages: any;
  id: string;
  name: string;
  trackedEntityType?: { id: string };
  trackedEntityAttribute?: { id: string };
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
export interface Orgunit {
  id: string;
  displayName: string;
}
export interface Store {
  loading: boolean;
  total: { [k: string]: number };
  period: any[];
  organisationUnits: any[];
  programs: Program[];
  dataSets: DataSet[];
  orgUnits: Orgunit[];
  program: any;
  stage: string;
  attribute: string;
  users: { [k: string]: any };
}
export interface ProgramSetting {
  program: string;
}
