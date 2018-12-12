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
