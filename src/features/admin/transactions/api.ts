import type {
    AdminTransactionFilters,
    AdminTransactionListResponse,
    ApiResponse,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

async function parseResponse<T>(response: Response): Promise<T> {
    const result = (await response.json()) as ApiResponse<T>;

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.');
    }

    return result.data;
}

export async function getAdminTransactions(
    filters: AdminTransactionFilters,
): Promise<AdminTransactionListResponse> {
    const params = new URLSearchParams({
        page: String(filters.page),
        limit: String(filters.limit),
    });

    if (filters.q.trim()) {
        params.set('q', filters.q.trim());
    }

    const response = await fetch(
        `${API_URL}/v1/admin/transactions?${params.toString()}`,
        {
            credentials: 'include',
            cache: 'no-store',
        },
    );

    return parseResponse<AdminTransactionListResponse>(response);
}
