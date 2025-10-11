import Page from "@/components/Page";
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import EventManagedByAdmin from "../../Role/Manager/EventManagedByAdmin";
import EventManagedByEmployee from "../../Role/Employee/EventManagedByEmployee";

const Event = () => {
    const { profile } = useAuth();
    return(
        <Page title="Quản lý trưng bày - Sự kiện">
            {(profile?.role === ROLE.ADMIN || profile?.role === ROLE.MOD) ? (
                <EventManagedByAdmin/>
            ) : (
                <EventManagedByEmployee/>
            )}
        </Page>
    )
}

export default Event;