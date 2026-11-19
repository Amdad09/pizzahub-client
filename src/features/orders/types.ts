export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface OrderStatusHistory {
    status: OrderStatus;
    actorId: string;
    actorRole: 'customer' | 'vendor';
    note?: string;
    createdAt: string;
}

export interface Order {
    _id: string;
    customerId: string;
    vendorId: string;
    menuItemId: string;

    itemSnapshot: {
        name: string;
        price: number;
        image: string | null;
        vendorName: string;
    };

    quantity: number;
    totalPrice: number;

    deliveryDate: string;
    deliveryAddress: string;
    phone: string;
    note?: string;

    status: OrderStatus;
    statusHistory: OrderStatusHistory[];

    createdAt: string;
    updatedAt: string;
}

export interface OrderFilters {
    status?: OrderStatus;
    page?: number;
    limit?: number;
}

export interface OrderPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface OrderListResponse {
    items: Order[];
    pagination: OrderPagination;
}

export interface CreateOrderInput {
    menuItemId: string;
    quantity: number;
    deliveryDate: string;
    deliveryAddress: string;
    phone: string;
    note?: string;
}

export interface OrderActionInput {
    reason?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
