export interface IICommonLandingPage{
    id: number,
    image_url: string,
    title: {
        vi: string,
        en: string
    },
    content: {
        vi: string,
        en: string
    },
    url?: string, 
    type?: string,
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
    id: string,
    image_url: string,
    title: string,
    artist: string,
    time: string,
    content: string,
    images?: IImageDetailObject[];
}

export interface IImageDetailObject{
    id: string,
    name: string,
    url: string
}

export interface IItemType{
    id: number,
    label: string,
    count: number,
    id_type: number,
}

export interface IType{
    id: number,
    label: string,
    children: IItemType[]
}

export interface IInfoExperience{
    id: number,
    label: string,
    image_url: string,
    content: string,
    open: string,
    hour: string
}
