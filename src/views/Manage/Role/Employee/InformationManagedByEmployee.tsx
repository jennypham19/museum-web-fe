import { Box } from "@mui/material";
import ShowAllInformationMember from "../../Information/components/ShowAllInformationMember";
import { DATA_INFOR_MEMBER } from "../Manager/InformationManagedByAdmin";

const InformationManagedByEmployee = () => {
    return (
        <Box>
            <ShowAllInformationMember
                data={DATA_INFOR_MEMBER}
            />
        </Box>
    )
}

export default InformationManagedByEmployee;