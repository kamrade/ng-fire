export class Address {
  zipCode: string;
  country: string;
  district: string;
  city: string;
  street: string;
  building: string;
  office: string;
}

export class Contact {
  contact: string;
  contactPerson: string;
}

export class Note {
  title: string;
  content?: string;
  createdAt: number;
  updatedAt: number;
  creator: string;
  creatorDisplayName: string;
}

export class Client {
  address: Address;
  contacts: Contact[];
  description: string;
  title: string;
  notes: Note[];
  createdAt: number;
  updatedAt: number;
  createdBy: string;
}

export class ClientComplex {
  data: Client;
  id: string;
}
