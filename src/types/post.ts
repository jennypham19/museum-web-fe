import { Dayjs } from "dayjs";

export interface CategoryProps{
  category: number,
  category_label: string,
}

export interface IImage{
  id: number,
  name: string,
  url: string
}

export interface IVideo{
  id: number,
  name: string,
  url: string
}

export interface ISource{
  id: number,
  linkFacebook: string,
  linkInstagram: string,
  linkYoutube: string,
  linkWeb: string
}

export interface FormDataPostAboutCollection{
  category: number,
  date: Dayjs | null,
  title: string,
  summary: string,
  author: string,
  period: string,
  content: string,
  source?: ISource | null,
  images?: IImage[],
  videos?: IVideo[],
  authorName: string
}

export interface IPost{
  category: number | null,
  date: Dayjs | null,
  title: string,
  summary: string,
  author: string,
  period: string,
  nameUrl?: string,
  imageUrl: string
  content: string,
  source?: ISource | null,
  images?: IImage[],
  videos?: IVideo[]
}
