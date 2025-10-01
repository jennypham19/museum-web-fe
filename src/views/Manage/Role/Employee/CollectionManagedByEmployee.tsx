import { Box } from "@mui/material";
import { useState } from "react";
import OverviewDataCreate from "../../components/OverviewDataCreate";
import OverviewData from "../../components/OverviewData";
import AllCollectionsCreated from "../../Display/Collections/components/AllCollectionsCreated";

const CollectionManagedByEmployee = () => {
    const [showAll, setShowAll] = useState(false);
    const [showAllCollections, setShowAllCollections] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });

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
            {!showAll && (
                <>
                    {/* Bộ sưu tập vừa tạo */}
                    <OverviewDataCreate
                        title="Bộ sưu tập vừa tạo"
                        onShowAllCreate={handleShowAllPaintingsCreate}
                    >
                        <Box px={2}>
                            
                        </Box>
                    </OverviewDataCreate>

                    {/* Trạng thái bộ sưu tập */}
                    <OverviewData
                        title="Trạng thái tác phẩm"
                        onShowAll={handleShowAllPaintings}
                    >
                        <Box p={2}></Box>
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
                    }}
                />
            )}
        </Box>
    )

    
}
export default CollectionManagedByEmployee;

