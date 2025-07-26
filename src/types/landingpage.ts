export interface IICommonLandingPage{
    id: number,
    image_url: string,
    title: string,
    content: string
}

export interface IPackageMember{
    id: number,
    title: string,
    price: string,
    members: number,
    guests: number,
    includes: string;
    benefits: string;
}

export interface IObjectArt{
    id: number,
    image_url: string,
    title: string,
    artist: string,
    time: string,
    content: string,
    images?: IImageDetailObject[];
}

export interface IImageDetailObject{
    id: number,
    name: string,
    image_detail_url: string
}