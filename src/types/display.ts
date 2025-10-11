import { StatusObject } from "@/constants/status";
import { IImage, Images, IPost } from "./post";
import { IUser } from "./user";

export interface IPainting{
    id: number,
    name: string, 
    author: string,
    imageUrl: string,
    period: string,
    description: string, 
    createdAt?: string,
    updatedAt?: string,
    images: IImage[],
    status: StatusObject | null,
    rejectionReason: string,
    isPublished: boolean
}

export interface FormDataPainting{
  name: string,
  author: string,
  period: string,
  description: string,
  images: Images[],
}

export interface DataStatusProps {
  id: number;
  value: string;
  label: string
}

export interface FormDataCollection{
  name: string,
  tags: string[],
  description: string,
}

export interface ICollection{
    id: number,
    name: string,
    imageUrl: string,
    nameImage: string,
    description: string, 
    createdAt?: string,
    updatedAt?: string,
    status: StatusObject | null,
    rejectionReason: string,
    isPublished: boolean,
    tags: string;
    curatorId: number;
    arts: IPainting[],
    curator: IUser,
    reasonSend: string,
}

export interface IEvent{
  id: number,
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  openTime: string,
  closeTime: string,
  imageUrl: string,
  nameImage: string,
  topic: string,
  createdAt?: string,
  updatedAt?: string,
  rejectionReason: string,
  isPublished: boolean,
  reasonSend: string,
  note: string,
  curator: IUser,
  posts: IPost[]
}