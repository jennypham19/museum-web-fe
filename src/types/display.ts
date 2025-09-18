import { IImage, Images } from "./post";

export interface IPainting{
    id: number,
    name: string, 
    author: string,
    imageUrl: string,
    period: string,
    description: string, 
    createdAt?: string,
    updatedAt?: string,
    images: IImage[]
}

export interface FormDataPainting{
  name: string,
  author: string,
  period: string,
  description: string,
  images: Images[],
}