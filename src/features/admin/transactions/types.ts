export type AdminTransactionStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface AdminTransactionVendor {
    id: string;
    name: string;
    email: string;
    businessName: string | null;
}

export interface AdminTransaction {
    id: string;
    vendor: AdminTransactionVendor | null;
    stripeInvoiceId: string | null;
    stripePaymentIntentId: string | null;
    stripeSubscriptionId: string | null;
    amount: number;
    currency: string;
    status: AdminTransactionStatus;
    createdAt: string;
    updatedAt: string;
}

export interface AdminTransactionFilters {
    q: string;
    page: number;
    limit: number;
}

export interface AdminTransactionPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AdminTransactionListResponse {
    items: AdminTransaction[];
    pagination: AdminTransactionPagination;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
