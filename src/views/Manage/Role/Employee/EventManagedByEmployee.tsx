import useAuth from "@/hooks/useAuth";
import { IEvent } from "@/types/display";
import { Box } from "@mui/material"
import { useMemo, useState } from "react";

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

    // List all events
    const handleShowAllEvents = () => {
        setShowAll(true);
        setShowAllEvents({
            open: true,
            type: 'all'
        })
    }
    return(
        <Box>
            Sự kiện của employee
        </Box>
    )
}
export default EventManagedByEmployee;