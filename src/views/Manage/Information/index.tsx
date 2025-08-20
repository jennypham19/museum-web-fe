import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import InformationManagedByAdmin from "../Role/Manager/InformationManagedByAdmin";
import InformationManagedByEmployee from "../Role/Employee/InformationManagedByEmployee";
import Page from "@/components/Page";

const Information = () => {
    const { profile } = useAuth();
    
    return(
        <Page title="Quản lý thông tin">
            {profile?.role === ROLE.ADMIN && (
                <InformationManagedByAdmin/>
            )}
            {profile?.role === ROLE.EMPLOYEE && (
                <InformationManagedByEmployee/>
            )}
        </Page>
    )
}

export default Information;