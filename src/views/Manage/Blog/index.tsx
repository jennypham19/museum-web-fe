import Page from "@/components/Page";
import useNotification from "@/hooks/useNotification";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/roles";
import BlogManagedByAdmin from "../Role/Manager/BlogManagedByAdmin";
import BlogManagedByEmployee from "../Role/Employee/BlogManagedByEmployee";

const Blog = () => {
    const { profile } = useAuth();
    const notify = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSearch = (value: string) => {
        setSearchTerm(value)
    }
    return(
        <Page title="Quản lý bài viết">
            {profile?.role === ROLE.ADMIN && (
                <BlogManagedByAdmin/>
            )}
            {profile?.role === ROLE.EMPLOYEE && (
                <BlogManagedByEmployee
                    onSearch={handleSearch}
                    searchTerm={searchTerm}
                />
            )}
        </Page>
    )
}

export default Blog;