export enum TitleContentArt{
    OVERALL = 'OVERALL',
    OBJECT_EXHIBITED = 'OBJECT_EXHIBITED',
    CONTENT = 'CONTENT',
    INSIDE_EXHIBITION = 'INSIDE_EXHIBITION'
}

export const TITLE_CONTENT_ART_LABELS: { [key in TitleContentArt]: string } = {
    [TitleContentArt.OVERALL]: 'Tổng quan',
    [TitleContentArt.OBJECT_EXHIBITED]: 'Đối tượng triển lãm',
    [TitleContentArt.CONTENT]: 'Nội dung liên quan',
    [TitleContentArt.INSIDE_EXHIBITION]: 'Bên trong triển lãm',
}

export const RoleUser = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    MEMBER: 'member',
    MOD: 'mod'
};

export type RoleUser = typeof RoleUser[keyof typeof RoleUser];

export const ROLE_LABELS: { [key in RoleUser]: string } = {
    [RoleUser.ADMIN]: 'Quản lý',
    [RoleUser.EMPLOYEE]: 'Nhân viên quản lý',
    [RoleUser.MEMBER]: 'Thành viên',
    [RoleUser.MOD]: 'Kiểm duyệt viên'
}

// Trạng thái tác phẩm, BST, triển lãm, sự kiện
export const StatusObject = {
    CREATED: 'created',
    PENDING: 'pending',
    REVIEWING: 'reviewing',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

export type StatusObject = typeof StatusObject[keyof typeof StatusObject];

export const STATUS_LABELS: { [key in StatusObject]: string } = {
    [StatusObject.CREATED]: 'Đã tạo',
    [StatusObject.PENDING]: 'Chờ phê duyệt',
    [StatusObject.REVIEWING]: 'Đang phê duyệt',
    [StatusObject.APPROVED]: 'Đã phê duyệt',
    [StatusObject.REJECTED]: 'Phê duyệt thất bại'
}