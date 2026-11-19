export interface AdminMenuItem {
    _id: string;
    vendorId: string;
    vendorName: string;
    name: string;
    description: string;
    price: number;
    category: string;
    location: string;
    images: string[];
    status: 'pending' | 'approved' | 'rejected' | 'inactive';
    isActive: boolean;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminMenuFilters {
    q: string;
    page: number;
    limit: number;
}

export interface AdminMenuPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AdminMenuListResponse {
    items: AdminMenuItem[];
    pagination: AdminMenuPagination;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
