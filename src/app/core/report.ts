export class Report {
  status: string;
  manager: string;
  region: string;
  direction: string;
  responsibility: string;
  year: string;
  client: string;
  facility: string;
  equipment: string;
  contractPrice: string;
  netPrice: string;
  gp: string;
  gpPercents: string;
  vat: string;
  periodOfExecution: string;
  comments: string;

  createdAt: number;
  updatedAt: number;
  createdBy: string;
}

export class ReportComplex {
  data: Report;
  id: string;
}

export const reportsInTable = [
  'status',
  'manager',
  'region',
  'direction',
  'responsibility',
  'year',
  'client',
  'facility',
  'equipment',
  'contractPrice',
  'netPrice',
  'gp',
  'gpPercents',
  'vat',
  'periodOfExecution',
  'comments',

  'createdAt',
  'updatedAt',
  'createdBy'
]
