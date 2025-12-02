import NavigateBack from "@/views/Manage/components/NavigateBack";
import { ICollection } from "@/types/display";
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Pagination, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import { useDataList } from "@/hooks/useDataList";
import { attachArtFromCollection, detachArtFromCollection, getCollectionHasArtById, getPaintings } from "@/services/display-service";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import useAuth from "@/hooks/useAuth";

interface AttactArtCollectionProps{
    onClose: () => void;
    id: number
}

const AttactArtCollection = (props: AttactArtCollectionProps) => {
    const notify = useNotification();
    const { profile } = useAuth();
    const { onClose, id } = props;
    const [isOpenColletion, setIsCollection] = useState(false);
    const { listData, fetchData } = useDataList(getPaintings, 8, 'approved', profile?.id);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedArtsUnassignedIds, setSelectedArtsUnassignedIds] = useState<number[]>([]); // Lấy id các tác phẩm chưa gán
    const [selectedArtsAssignedIds, setSelectedArtsAssignedIds] = useState<number[]>([]);  // Lấy id các tác phẩm đã gán
    const [collection, setCollection] = useState<ICollection>({} as ICollection)

    const getCollectionHasArtsById = async(id: number) => {
        const res = await getCollectionHasArtById(id);
        const data = res.data as any as ICollection;
        setCollection(data)
    }
    useEffect(() => {
        if(id){
            getCollectionHasArtsById(id)
        }
    }, [id])

    const assignedArtIds = new Set(collection.arts?.map(item => item.id));
    // Lọc các tác phẩm có trong listData nhưng không có trong data.arts
    const artUnAssigned = listData.filter(item => !assignedArtIds.has(item.id))
    
    //Bộ lọc theo tên
    const filteredArtworksUnassigned = useMemo(
        () =>
            artUnAssigned.filter((a) => 
            a.name.toLowerCase().includes(search.toLowerCase())
        ),
        [artUnAssigned, search]
    )

    // Phân trang
    const totalPages = Math.ceil(filteredArtworksUnassigned.length / 8);
    const paginatedArtworksUnassigned = useMemo(() => {
        const start = (page - 1) * 8;
        return filteredArtworksUnassigned.slice(start, start + 8);
    }, [filteredArtworksUnassigned, page])
    
    const handleSelectedArtsAssigned = (id: number) => {
        setSelectedArtsAssignedIds((prev) =>
            prev.includes(id) ? prev.filter((artId) => artId !== id) : [...prev, id]
        )  
    }


    const handleSelectedArtsUnassigned = (id: number) => {
        setSelectedArtsUnassignedIds((prev) =>
            prev.includes(id) ? prev.filter((artId) => artId !== id) : [...prev, id]
        )
    }

    const detachedArtFromCollection = async() => {
        try {
            const payload = { 
                artIds: [ ...selectedArtsAssignedIds ]
            };
            const res = await detachArtFromCollection(collection.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            getCollectionHasArtsById(id);
            fetchData(1, 8, 'approved')
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const attachedArtToCollection = async() => {
        try {
            const payload = {
                artIds: [...selectedArtsUnassignedIds]
            }
            const res = await attachArtFromCollection(Number(collection.id), payload)
            notify({
                message: res.message,
                severity: 'success'
            })
            getCollectionHasArtsById(id);
            fetchData(1, 8, 'approved')
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }
    
    
    return(
        <>
            <NavigateBack
                title="Gán tác phẩm vào bộ sưu tập"
                onBack={onClose}
            />
            <Paper sx={{ p: 3 }}>
                {/* Thông tin bộ sưu tập */}
                <Box mb={3}>
                    <Typography variant="h5">{collection.name}</Typography>
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
                            {collection.description}
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
                            {collection.description}
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
                        Số tác phẩm được gán trong bảo tàng: {collection.arts?.length ?? 0}
                    </Typography>
                    <Grid container spacing={2}>
                        {collection.arts?.map((art, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3}} key={index}>
                                <Card
                                    sx={{
                                        position: 'relative',
                                        transition: '0.3s'
                                    }}
                                >
                                    <Checkbox
                                        checked={selectedArtsAssignedIds.includes(art.id)}
                                        onChange={() => handleSelectedArtsAssigned(art.id)}
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
                    {/* Nút gỡ */}
                    {collection.arts?.length > 0 && (
                        <Box display="flex" justifyContent="flex-end" mt={3}>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: COLORS.BUTTON }}
                                onClick={detachedArtFromCollection}
                                disabled={selectedArtsAssignedIds.length === 0}
                            >
                                Gỡ khỏi bộ sưu tập
                            </Button>
                        </Box>
                    )}
                </Box>
                {/* Tác phẩm chưa gán */}
                <Box>
                    <Typography variant="body2">
                        Số tác phẩm chưa được gán: {artUnAssigned.length ?? 0}
                    </Typography>
                    <TextField
                        label='Tìm kiếm tác phẩm'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1)
                        }}
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 2}}
                    />
                    <Grid container spacing={2}>
                        {paginatedArtworksUnassigned.length === 0 && (
                            <Typography variant="body2" mt={1}>Không tồn tại bản ghi nào</Typography>
                        )}
                        {paginatedArtworksUnassigned.map((art, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3}} key={index}>
                                <Card
                                    sx={{
                                        position: 'relative',
                                        transition: '0.3s'
                                    }}
                                >
                                    <Checkbox
                                        checked={selectedArtsUnassignedIds.includes(art.id)}
                                        onChange={() => handleSelectedArtsUnassigned(art.id)}
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
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, val) => setPage(val)}
                                color="primary"
                            />
                        </Box>                        
                    )}

                    {/* Nút gán */}
                    <Box display="flex" justifyContent="flex-end" mt={3}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: COLORS.BUTTON }}
                            onClick={attachedArtToCollection}
                            disabled={selectedArtsUnassignedIds.length === 0}
                        >
                            Gán vào bộ sưu tập
                        </Button>
                    </Box>

                </Box>
            </Paper>
        </>
    )
}
export default AttactArtCollection;