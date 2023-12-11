export interface NewsMediaItem {
    id: string;
    title: string;
    imageURL:string ;
    link:string;
    publisher: string;
    uploadedAt: string;
    type: string;
    order: number;
    createdAt: string;
    updatedAt: string;
  }
  export interface FetchMediaData {
    data: NewsMediaItem[];
    error: string | null;
  }