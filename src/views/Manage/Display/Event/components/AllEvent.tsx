import { Box } from "@mui/material";

interface AllEventProps {
    onBack: () => void;
}

const AllEvent = (props: AllEventProps) => {
    const { onBack} = props;
    return(
        <Box>
            All event
        </Box>
    )
}

export default AllEvent;