export interface Post {
  title: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
  ownerID: string;
  ownerDisplayName: string;
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
