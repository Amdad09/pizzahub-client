export type MenuStatus = 'pending' | 'approved' | 'rejected' | 'inactive';

export interface MenuItem {
    _id: string;
    vendorId: string;
    vendorName: string;
    name: string;
    description: string;
    price: number;
    category: string;
    location: string;
    images: string[];
    status: MenuStatus;
    isActive: boolean;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface MenuFilters {
    q?: string;
    category?: string;
    location?: string;
    sort?: 'price_asc' | 'price_desc';
    page: number;
    limit: number;
}

export interface MenuPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface MenuListResponse {
    items: MenuItem[];
    pagination: MenuPagination;
}

export interface MenuInput {
    name: string;
    description: string;
    price: number;
    category: string;
    location: string;
    images: string[];
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
