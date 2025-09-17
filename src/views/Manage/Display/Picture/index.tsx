import Page from "@/components/Page";
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import PaintingManagedByAdmin from "../../Role/Manager/PaintingManagedByAdmin";
import PaintingManagedByEmployee from "../../Role/Employee/PaintingManagedByEmployee";

const Painting = () => {
    const { profile } = useAuth();
    return(
        <Page title="Quản lý trưng bày - Tác phẩm">
            {profile?.role === ROLE.ADMIN ? (
                <PaintingManagedByAdmin/>
            ) : (
                <PaintingManagedByEmployee/>
            )}
        </Page>
    )
}

export default Painting;