export class Note {

  title: string;
  content: string;

  createdAt: number;
  updatedAt?: number;

  ownerID: string;
  ownerDisplayName: string;

}

export class NoteComplex {
  data: Note;
  id: string;
}
