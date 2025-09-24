import CommonImage from "@/components/Image/index";
import { Card, Stack } from "@mui/material";

interface CardDataProps<T> {
    data: T;
    onOpenDetail: (item: T) => void;
    renderData: (data: T) => React.ReactNode;
    imageUrl: string,
    title: string,
}

const CardData = <T,>({
    data,
    onOpenDetail,
    renderData,
    imageUrl,
    title
} :  CardDataProps<T>) => {
    return (
        <Card
            onClick={() => onOpenDetail(data)}
            sx={{ height: '100%', cursor: 'pointer'}}
        >
            <CommonImage
                src={imageUrl}
                alt={title}
                sx={{ height: 220, width: '100%', p: 2}}
            />
            {renderData(data)}
        </Card>
    )
}

export default CardData;