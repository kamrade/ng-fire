export interface Status {
  title: string;
  abbr?: string;
  description: string;
}

export interface StatusComplex {
  data: Status
  id: string;
}
