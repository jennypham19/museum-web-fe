import NavigateBack from "@/views/Manage/components/NavigateBack";
import AssignArtworkToCollectionCardView from "./AssignPaintingToCollection";
import { ICollection } from "@/types/display";
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useDataList } from "@/hooks/useDataList";
import { getPaintings } from "@/services/display-service";

interface AttactArtCollectionProps{
    onClose: () => void;
    data: ICollection
}

const mockArtworks = [
  { id: 1, name: "Hoa Sen", author: "Nguyễn Văn A", thumbnail: "/images/hoa-sen.jpg" },
  { id: 2, name: "Phong cảnh quê", author: "Trần Thị B", thumbnail: "/images/lang-que.jpg" },
  { id: 3, name: "Bình minh", author: "Lê Văn C", thumbnail: "/images/binh-minh.jpg" },
  { id: 4, name: "Cánh đồng lúa", author: "Nguyễn Văn D", thumbnail: "/images/lua.jpg" },
  { id: 5, name: "Hoàng hôn", author: "Phạm Thị E", thumbnail: "/images/hoang-hon.jpg" },
  { id: 6, name: "Rừng thông", author: "Lý Văn F", thumbnail: "/images/rung-thong.jpg" },
  { id: 7, name: "Đồi chè", author: "Nguyễn Văn G", thumbnail: "/images/doi-che.jpg" },
];

const mockCollection = {
  id: 101,
  name: "Bộ sưu tập Mùa Hè 2025",
  description: "Tổng hợp các tác phẩm mang màu sắc tươi sáng và cảm xúc mùa hè.",
  currentCount: 12,
};

const AttactArtCollection = (props: AttactArtCollectionProps) => {
    const { onClose, data } = props;
    const handleAssign = (ids: number[]) => {
        console.log("Tác phẩm được chọn:", ids);
    };
    const [isOpenColletion, setIsCollection] = useState(false);
    const { listData } = useDataList(getPaintings, 8, 'approved');
    console.log("listData: ",listData);
    
    return(
        <>
            <NavigateBack
                title="Gán tác phẩm vào bộ sưu tập"
                onBack={onClose}
            />
            <Paper sx={{ p: 3 }}>
                {/* Thông tin bộ sưu tập */}
                <Box mb={3}>
                    <Typography variant="h5">{data.name}</Typography>
                    {!isOpenColletion && (
                        <Typography 
                            fontSize={{ xs: '14px', md: '15px'}}
                            sx={{
                                opacity: 0.8, 
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',  
                            }}
                        >
                            {data.description}
                        </Typography>
                    )}
                    {isOpenColletion && (
                        <Typography 
                            fontSize={{ xs: '14px', md: '15px'}}
                            sx={{
                                opacity: 0.8, 
                                overflow: 'hidden',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',  
                            }}
                        >
                            {data.description}
                        </Typography>
                    )}
                    <Box display='flex' justifyContent='flex-end'>
                        <Button
                            onClick={() => setIsCollection((prev) => !prev)}
                            variant="text"
                            sx={{ 
                                color: "#000", fontWeight: 500, fontSize: '13px',
                                textDecoration: 'underline',
                                '&:hover': { textDecoration: 'underline', bgcolor: 'transparent'} 
                            }}
                            >
                            {isOpenColletion ? "Ẩn bớt" : "Xem thêm"}
                        </Button>
                    </Box>
                    <Typography variant="body2" mb={2}>
                        Số tác phẩm được gán trong bảo tàng: {data.arts.length ?? 0}
                    </Typography>
                    <Grid container spacing={2}>
                        {data.arts.map((art, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3}} key={index}>
                                <Card
                                    sx={{
                                        position: 'relative',
                                        transition: '0.3s'
                                    }}
                                >
                                    <Checkbox
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            backgroundColor: 'rgba(255,255,255,0.7)',
                                            borderRadius: '50%',
                                            '&:hover': { bgcolor: 'rgba(255,255,255,0.7)'}
                                        }}
                                    />
                                    <CardMedia
                                        component='img'
                                        height={160}
                                        image={art.imageUrl}
                                        alt={art.name}
                                        sx={{ objectFit: 'fill'}}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
                                            {art.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {`${art.author} - ${art.period}`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
            <AssignArtworkToCollectionCardView 
                artworks={mockArtworks}
                collection={mockCollection}
                onAssign={handleAssign}
            />
        </>
    )
}
export default AttactArtCollection;