import Page from "@/components/Page";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/roles";
import CollectionManagedByEmployee from "../../Role/Employee/CollectionManagedByEmployee";
import CollectionManagedByAdmin from "../../Role/Manager/CollectionManagedByAdmin";

const Collections = () => {
    const { profile } = useAuth();
    return(
        <Page title="Quản lý trưng bày - Bộ sưu tập">
            {(profile?.role === ROLE.ADMIN || profile?.role === ROLE.MOD) ? (
                <CollectionManagedByAdmin/>
            ) : (
                <CollectionManagedByEmployee/>
            )}
        </Page>
    )
}

export default Collections;