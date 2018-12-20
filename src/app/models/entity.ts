export interface Entity {
  title: string;
  abbr?: string;
  description?: string;
}

export interface EntityComplex {
  data: Entity;
  id: string;
}
