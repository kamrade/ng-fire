export class Post {
  title: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
  ownerID: string;
  ownerDisplayName: string;
}

export class PostComplex {
  id: string;
  data: Post;
}

export interface PostWithID {
  title: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
  ownerID: string;
  ownerDisplayName: string;
  id?: string;
}
