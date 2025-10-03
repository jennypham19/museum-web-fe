import { Box, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import OverviewDataCreate from "../../components/OverviewDataCreate";
import OverviewData from "../../components/OverviewData";
import AllCollectionsCreated from "../../Display/Collections/components/AllCollectionsCreated";
import { ICollection } from "@/types/display";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCollections } from "@/services/display-service";
import useAuth from "@/hooks/useAuth";
import Grid from "@mui/material/Grid2";
import CardData from "../../components/CardData";
import ViewCollection from "../../Display/Collections/components/ViewCollection";

const CollectionManagedByEmployee = () => {
    const { profile } = useAuth();
    const query = {
        page: 1,
        rowsPerPage: 4
    }
    const [showAll, setShowAll] = useState(false);
    const [showAllCollections, setShowAllCollections] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [openViewCollection, setOpenViewCollection] = useState(false);
    const [isView, setIsView] = useState(false)
    const [collection, setCollection] = useState<ICollection | null>(null);

    const { data } = useQuery({
        queryKey: ['data', 'created', query.page, query.rowsPerPage],
        queryFn: () => {
            return (getCollections({ page: query.page, limit: query.rowsPerPage, status: 'created', curatorId: profile?.id }));
        },
        placeholderData: keepPreviousData
    });
    const collectionsCreated = data?.data?.data as any as ICollection[];

    const collectionStatus = useMemo(() => ['pending', 'reviewing', 'approved', 'rejected'], [])
    const { data: collections } = useQuery({
        queryKey: ['data', collectionStatus, query.page, query.rowsPerPage ],
        queryFn: () => {
            return getCollections({ page: query.page, limit: query.rowsPerPage, status: collectionStatus, curatorId: profile?.id })
        },
        placeholderData: keepPreviousData
    });
    const collectionsStatus = collections?.data?.data as any as ICollection[];

    const fetchData = async (page: number, limit: number, status?: string | string[], curatorId?: number) => {
        await getCollections({ page: page, limit: limit, status: status, curatorId: curatorId })
    }

    // Xem chi tiết
    const handleOpenViewCollection = (data: ICollection) => {
        setOpenViewCollection(true);
        setCollection(data);
        setIsView(true)
    }
    const handleCloseViewCollection = () => {
        setOpenViewCollection(false);
        setCollection(null);
        setIsView(false)
    }

    const handleShowAllPaintingsCreate = () => {
      setShowAll(true)
      setShowAllCollections({
        open: true,
        type: 'created'
      })
    }

    const handleShowAllPaintings = () => {
      setShowAll(true)
      setShowAllCollections({
        open: true,
        type: 'all'
      })
    }
    return(
        <Box>
            {(!showAll && !isView) && (
                <>
                    {/* Bộ sưu tập vừa tạo */}
                    <OverviewDataCreate
                        title="Bộ sưu tập vừa tạo"
                        onShowAllCreate={handleShowAllPaintingsCreate}
                    >
                        <Box px={2}>
                            <Grid container spacing={3}>
                                {collectionsCreated?.length === 0 && (
                                    <Typography fontWeight={700} p={4}>Không tồn tại bản ghi nào</Typography>
                                )}
                                {collectionsCreated?.map((collection, index) => {
                                    return (
                                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                                            <CardData
                                                data={collection}
                                                imageUrl={collection.imageUrl}
                                                title={collection.name}
                                                onOpenDetail={handleOpenViewCollection}
                                                renderData={(collection) => (
                                                    <Stack px={2} pb={2} direction='column'>
                                                        <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{collection.name}</Typography>
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
                                                    </Stack>
                                                )}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </OverviewDataCreate>

                    {/* Trạng thái bộ sưu tập */}
                    <OverviewData
                        title="Trạng thái tác phẩm"
                        onShowAll={handleShowAllPaintings}
                    >
                        <Box p={2}>
                            <Grid container spacing={3}>
                                {collectionsStatus?.length === 0 && (
                                    <Typography fontWeight={700} p={4}>Không tồn tại bản ghi nào</Typography>
                                )}
                                {collectionsStatus?.map((collection, index) => {
                                    return (
                                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                                            <CardData
                                                data={collection}
                                                imageUrl={collection.imageUrl}
                                                title={collection.name}
                                                onOpenDetail={handleOpenViewCollection}
                                                renderData={(collection) => (
                                                    <Stack px={2} pb={2} direction='column'>
                                                        <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{collection.name}</Typography>
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
                                                    </Stack>
                                                )}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </OverviewData>
                </>
            )}
            {/* Bộ sưu tập vừa tạo */}
            {showAll && showAllCollections.open && showAllCollections.type === 'created' && (
                <AllCollectionsCreated
                    onBack={() => {
                        setShowAll(false)
                        setShowAllCollections({
                            open: false,
                            type: 'created'
                        })
                        fetchData(query.page, query.rowsPerPage, 'created', profile?.id);
                        fetchData(query.page, query.rowsPerPage, collectionStatus, profile?.id);
                    }}
                />
            )}
            {openViewCollection && collection && isView && (
                <ViewCollection
                    data={collection}
                    onBack={handleCloseViewCollection}
                />
            )}
        </Box>
    )

    
}
export default CollectionManagedByEmployee;

