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

export interface IPost{
  category: number,
  date: Dayjs | null,
  title: string,
  summary: string,
  author: string,
  period: string,
  nameUrl?: string,
  imageUrl: string
  content: string,
  authorName: string,
  source?: ISource | null,
  images?: IImage[],
  videos?: IVideo[]
}

export interface SourceLinks {
  link_facebook: string;
  link_instagram: string;
  link_youtube: string;
  link_web: string;
}

export interface Images {
  name: string,
  url: string
}

export interface Videos {
  name: string,
  url: string
}

export interface FormDataPostAboutCollection{
  category: number,
  date: Dayjs | null,
  title: string,
  summary: string,
  author: string,
  period: string,
  content: string,
  source?: SourceLinks | null,
  images: Images[],
  videos: Videos[],
  authorName: string
}


