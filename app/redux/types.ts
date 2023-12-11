export interface NewsMediaItem {
  id: string;
  title: string;
  imageURL: string;
  link: string;
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

export interface PortfolioItem {
  id: string;
  order: number;
  location: string;
  model: string;
  size: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
export interface PortfolioData {
  data: PortfolioItem[];
  error: string | null;
}

export interface ModelItem {
  id: string;
  order: number;
  representativeImageURL: string;
  name: string;
  description: string;
  minPrice: number;
  size: number;
  sizeDetail: number;
  exteriorMaterial: string[];
  insulation: string;
  structure: string;
  windows: string[];
  furniture: string[];
  purpose: string[];
  purposeDetail: string[];
  createdAt: string;
  updatedAt: string;
  modelColors: string[];
}
export interface ModelData {
  data: ModelItem[];
  error: string | null;
}
