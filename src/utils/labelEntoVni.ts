import { ROLE_LABELS, RoleUser, STATUS_LABELS, StatusObject } from "@/constants/status";

export const getRoleLabel = (role: RoleUser | null | undefined) : string => {
    if(!role) return "Chưa xác định";
    return ROLE_LABELS[role] || role;
}

export const getStatusLabel = (status: StatusObject | null | undefined) : string => {
    if(!status) return "Chưa xác định";
    return STATUS_LABELS[status] || status;
}

export const getStatusLabelColor = (status: StatusObject | null) => {
    switch(status) {
        case 'reviewing':
            return { color: 'info' as const };
        case 'approved':
            return { color: 'success' as const };
        case 'rejected':
            return { color: 'error' as const };
        case 'pending':
        default:
            return { color: 'warning' as const };
    }
}