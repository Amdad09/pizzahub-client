export type AdminUserRole = 'customer' | 'vendor';
export type AdminUserRoleFilter = 'all' | AdminUserRole;

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: AdminUserRole;
    businessName: string | null;
    isBlocked: boolean;
    createdAt: string;
}

export interface AdminUserFilters {
    q: string;
    role: AdminUserRoleFilter;
    page: number;
    limit: number;
}

export interface AdminUserPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AdminUserListResponse {
    items: AdminUser[];
    pagination: AdminUserPagination;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
