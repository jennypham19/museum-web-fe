import useAuth from "@/hooks/useAuth";
import { IEvent } from "@/types/display";
import { Box } from "@mui/material"
import { useMemo, useState } from "react";
import OverviewDataCreate from "../../components/OverviewDataCreate";
import Grid from "@mui/material/Grid2";
import OverviewData from "../../components/OverviewData";
import AllEventCreated from "../../Display/Event/components/AllEventCreated";
import AllEvent from "../../Display/Event/components/AllEvent";

const EventManagedByEmployee = () => {
    const { profile } = useAuth();
    const query = {
        page: 1,
        rowsPerPage: 4
    };
    const [showAll, setShowAll] = useState(false);
    const [showAllEvents, setShowAllEvents] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [isView, setIsView] = useState(false);
    const [openViewEvent, setOpenViewEvent] = useState(false);
    const [event, setEvent] = useState<IEvent | null>(null);
    const eventStatus = useMemo(() => ['pending', 'reviewing', 'approved', 'rejected'], [])
    
    // Xem chi tiết
    const handleOpenViewEvent = (data: IEvent) => {
        setOpenViewEvent(true);
        setEvent(data);
        setIsView(true)
    }

    const handleCloseViewEvent = () => {
        setOpenViewEvent(false);
        setEvent(null);
        setIsView(false)
    }

    // List events is created
    const handleShowAllEventsCreated = () => {
        setShowAll(true);
        setShowAllEvents({
            open: true,
            type: 'created'
        })
    }

    const handleCloseAllEventCreated = () => {
        setShowAll(false);
        setShowAllEvents({
            open: false,
            type: 'created'
        })
    }

    // List all events
    const handleShowAllEvents = () => {
        setShowAll(true);
        setShowAllEvents({
            open: true,
            type: 'all'
        })
    }

    const handleCloseAllEvents = () => {
        setShowAll(false);
        setShowAllEvents({
            open: false,
            type: 'all'
        })
    }
    return(
        <Box>
            {(!showAll && !isView) && (
                <>
                    {/* Sự kiện vừa tạo */}
                    <OverviewDataCreate
                        title="Sự kiện vừa tạo"
                        onShowAllCreate={handleShowAllEventsCreated}
                    >
                        <Box p={2}>

                        </Box>
                    </OverviewDataCreate>

                    {/* Trạng thái sự kiện */}
                    <OverviewData
                        title="Trạng thái sự kiện"
                        onShowAll={handleShowAllEvents}
                    >
                        <Box p={2}></Box>
                    </OverviewData>
                </>
            )}
            {/* Sự kiện vừa tạo */}
            {showAll && showAllEvents.open && showAllEvents.type === 'created' && (
                <AllEventCreated
                    onBack={handleCloseAllEventCreated}
                />
            )}
            {/* Trạng thái sự kiện */}
            {showAll && showAllEvents.open && showAllEvents.type === 'all' && (
                <AllEvent
                    onBack={handleCloseAllEvents}
                />
            )}
        </Box>
    )
}
export default EventManagedByEmployee;