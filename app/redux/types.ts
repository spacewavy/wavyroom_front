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

export interface MainCarouselItem {
  modelName: string;
  imageURL: string;
  purpose: string;
  order: number;
}

export interface FetchMainCarouselData {
  data: MainCarouselItem[];
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

export interface NavigationModelItem {
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
export interface NavigationModelData {
  data: NavigationModelItem[];
  error: string | null;
}
export interface ModelItem {
  id: string;
  representativeImageURL: string;
  representativeNoBGImageURL: string;
  name: string;
  purpose: string[];
  minPrice: number;
}
export interface ModelData {
  data: ModelItem[];
  error: string | null;
}
export interface AboutReputationItem {
  id: string;
  order: number;
  imageURL: string;
  title: string;
  content: string;
  writenAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface AboutReputationData {
  data: AboutReputationItem[];
  error: string | null;
}

export interface ModelDetailItem {
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
  modelColors: ModelColors[];
  modelExamples: ModelExample[];
}
export interface ModelDetailData {
  data: ModelDetailItem;
  error: string | null;
}
export interface OtherModelsDetailData {
  data: OtherModelsDetailItem[];
  error: string | null;
}
export interface OtherModelsDetailItem {
  id: string;
  minPrice: string;
  name: string;
  nameKO: string;
  purpose: string[];
  purposeKO: string[];
  representativeImageURL: string;
  smallName: string;
}

export interface ModelColors {
  id: string;
  order: number;
  imageURL: string;
  colorId: string;
  name: string;
  modelIdSubstitude: string;
  modelId: string;
  isSelected?: boolean;
  isDefault: boolean;
}

export interface ModelExample {
  id: string;
  order: number;
  address: string;
  imageURL: string;
  modelIdSubstitude: string;
  modelId: string;
}
export interface OptionDetail {
  order: number;
  name: string;
  price: number;
  isDefault: boolean;
  isSelected?: boolean;
  meshName: string;
  groupName: string;
  blockMeshNames: string[];
}

export interface ModelSecondOption {
  name: string;
  isMultipleSelectable: boolean;
  optionDetails: OptionDetail[];
}

export interface ModelFloorOptions {
  id: string;
  name: string;
  order: number;
  price: number;
  isDefault: boolean;
  isSelected?: boolean;
  threeDFileURL: string;
  modelSecondOptions: ModelSecondOption[];
  ModelKitchenTypes: ModelKitchenType[];
}

export interface Customization {
  modelColors: ModelColors[];
  modelFloorOptions: ModelFloorOptions[];
}

export interface ModelKitchenType {
  name: string;
  order: number;
  options: ModelKitchenOption[];
  meshName: string;
  blockMeshNames: string[];
  isSelected?: boolean;
}
export interface ModelKitchenOption {
  name: string;
  isMultipleSelectable: boolean;
  order: number;
  optionDetails: ModelKitchenOptionDetail[];
}
export interface ModelKitchenOptionDetail {
  name: string;
  order: number;
  isDefault: boolean;
  isFixed: boolean;
  blockMeshNames: string[];
  isSelected?: boolean;
}
export interface CustomizationData {
  data: Customization;
  error: string | null;
}
