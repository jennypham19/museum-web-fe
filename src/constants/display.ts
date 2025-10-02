export interface TopicsProps{
    id: number;
    label: string;
    value: string;
}

export const TOPICS: TopicsProps[] = [
    {
        id: 1,
        label: 'Theo loại hiện vật',
        value: 'type_exhibit',
    },
    {
        id: 2,
        label: 'Theo phong cách nghệ thuật',
        value: 'art_style'
    },
    {
        id: 3,
        label: 'Theo họa tiết chủ đạo',
        value: 'pattern'
    },
    {
        id: 4,
        label: 'Theo giai đoạn lịch sử',
        value: 'historical_period'
    },
    {
        id: 5,
        label: 'Theo khu vực/ văn hóa',
        value: 'regional_culture'
    },
    {
        id: 6,
        label: 'Theo xuất xứ & xưởng chế tác',
        value: 'origin_factory'
    }
]

export interface TagsProps{
    id: number;
    label: string;
    value: string;
    topic: string;
}

export const TAGS: TagsProps[] = [
    {
        id: 1,
        label: 'Table Lamps Tiffany',
        value: 'Table Lamps Tiffany',
        topic: 'type_exhibit',
    },
    {
        id: 2,
        label: 'Floor Lamps Tiffany',
        value: 'Floor Lamps Tiffany',
        topic: 'type_exhibit',
    },
    {
        id: 3,
        label: 'Chandeliers Tiffany',
        value: 'Chandeliers Tiffany',
        topic: 'type_exhibit',
    },
    {
        id: 4,
        label: 'Wall Sconces Tiffany',
        value: 'Wall Sconces Tiffany',
        topic: 'type_exhibit',
    },
    {
        id: 5,
        label: 'Stained Glass Windows',
        value: 'Stained Glass Windows',
        topic: 'type_exhibit',
    },
    {
        id: 6,
        label: 'Decorative Tiffany Objects',
        value: 'Decorative Tiffany Objects',
        topic: 'type_exhibit',
    },
    {
        id: 7,
        label: 'Art Nouveau',
        value: 'Art Nouveau',
        topic: 'art_style',
    },
    {
        id: 8,
        label: 'Arts and Crafts',
        value: 'Arts and Crafts',
        topic: 'art_style',
    },
    {
        id: 9,
        label: 'Gothic Revival',
        value: 'Gothic Revival',
        topic: 'art_style',
    },
    {
        id: 10,
        label: 'Art Deco',
        value: 'Art Deco',
        topic: 'art_style',
    },
    {
        id: 11,
        label: 'Nature-inspired',
        value: 'Nature-inspired',
        topic: 'art_style',
    },
    {
        id: 12,
        label: 'Geometric Patterns',
        value: 'Geometric Patterns',
        topic: 'art_style',
    },
    {
        id: 13,
        label: 'Lotus',
        value: 'Lotus',
        topic: 'pattern'
    },
    {
        id: 14,
        label: 'Roses',
        value: 'Roses',
        topic: 'pattern'
    },
    {
        id: 15,
        label: 'Chrysanthemun',
        value: 'Chrysanthemun',
        topic: 'pattern'
    },
    {
        id: 16,
        label: 'Daffodils',
        value: 'Daffodils',
        topic: 'pattern'
    },
    {
        id: 17,
        label: 'Dragonflies',
        value: 'Dragonflies',
        topic: 'pattern'
    },
    {
        id: 18,
        label: 'Peacocks',
        value: 'Peacocks',
        topic: 'pattern'
    },
    {
        id: 19,
        label: 'Landscape',
        value: 'Landscape',
        topic: 'pattern'
    },
    {
        id: 20,
        label: 'Late 19th Century',
        value: 'Late 19th Century',
        topic: 'historical_period'
    },
    {
        id: 21,
        label: 'Early 20th Century',
        value: 'Early 20th Century',
        topic: 'historical_period'
    },
    {
        id: 22,
        label: 'Louis Comfort Tiffany period (1890-1930s)',
        value: 'Louis Comfort Tiffany period (1890-1930s)',
        topic: 'historical_period'
    },
    {
        id: 23,
        label: 'Asia Art',
        value: 'Asia Art',
        topic: 'regional_culture'
    },
    {
        id: 24,
        label: 'Europe Art',
        value: 'Europe Art',
        topic: 'regional_culture'
    },
    {
        id: 25,
        label: 'Africa Art',
        value: 'Africa Art',
        topic: 'regional_culture'
    },
    {
        id: 26,
        label: 'Middle East Art',
        value: 'Middle East Art',
        topic: 'regional_culture'
    },
    {
        id: 27,
        label: 'Latin America Art',
        value: 'Latin America Art',
        topic: 'regional_culture'
    },
    {
        id: 28,
        label: 'Folk Art',
        value: 'Folk Art',
        topic: 'regional_culture'
    },
    {
        id: 29,
        label: 'Indigenous Art',
        value: 'Indigenous Art',
        topic: 'regional_culture'
    },
    {
        id: 30,
        label: 'Tiffany Studios New York',
        value: 'Tiffany Studios New York',
        topic: 'origin_factory'
    },
    {
        id: 31,
        label: 'Tiffany Glass & Decorating Company',
        value: 'Tiffany Glass & Decorating Company',
        topic: 'origin_factory'
    },
    {
        id: 32,
        label: 'Comtemporary Designers',
        value: 'Comtemporary Designers',
        topic: 'origin_factory'
    },
]