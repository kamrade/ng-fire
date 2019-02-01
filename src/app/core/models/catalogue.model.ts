export class CatalogueItem {
  id: string;
  title: string;
  abbr?: string;
  description?: string;
}

export class CatalogueCollection {
  data: CatalogueItem[];
  name: string;
}
