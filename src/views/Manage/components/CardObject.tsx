import { Card, Stack } from "@mui/material";
import CommonImage from "@/components/Image/index";

interface CardObjectProps<T> {
    data: T,
    onOpenDetail: (item: T) => void;
    imageUrl: string,
    title: string;
    renderData: (data: T) => React.ReactNode
}

const CardObject = <T,>({
    data,
    onOpenDetail,
    imageUrl,
    title, 
    renderData
} : CardObjectProps<T>) => {
    return (
      <Card onClick={() => onOpenDetail(data)} sx={{ height: '100%', cursor: 'pointer' }}>
        <CommonImage
          src={imageUrl}
          alt={title}
          sx={{ height: { xs: 200, md: 250 }, width: '100%', p: 2 }}
        />
        <Stack px={2} pb={2} direction='column'>
            {renderData(data)}
        </Stack>
      </Card>
    );
}

export default CardObject;