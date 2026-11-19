import type {
    ApiResponse,
    CreateOrderInput,
    Order,
    OrderActionInput,
    OrderFilters,
    OrderListResponse,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';
const ORDERS_URL = `${API_URL}/v1/orders`;

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const response = await fetch(endpoint, {
        ...options,
        credentials: 'include',
        headers: {
            ...(options.body && !(options.body instanceof FormData)
                ? { 'Content-Type': 'application/json' }
                : {}),
            ...options.headers,
        },
    });

    const result = (await response.json()) as ApiResponse<T> & {
        code?: string;
    };

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.');
    }

    return result.data;
}

function buildQuery(filters: OrderFilters): string {
    const params = new URLSearchParams();

    if (filters.status) params.set('status', filters.status);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));

    const query = params.toString();
    return query ? `?${query}` : '';
}

export const ordersApi = {
    create: (input: CreateOrderInput) =>
        apiRequest<Order>(ORDERS_URL, {
            method: 'POST',
            body: JSON.stringify(input),
        }),

    getCustomerOrders: (filters: OrderFilters = {}) =>
        apiRequest<OrderListResponse>(
            `${ORDERS_URL}/customer${buildQuery(filters)}`,
        ),

    getCustomerOrder: (id: string) =>
        apiRequest<Order>(`${ORDERS_URL}/customer/${id}`),

    getVendorOrders: (filters: OrderFilters = {}) =>
        apiRequest<OrderListResponse>(
            `${ORDERS_URL}/vendor${buildQuery(filters)}`,
        ),

    getVendorOrder: (id: string) =>
        apiRequest<Order>(`${ORDERS_URL}/vendor/${id}`),

    cancel: (id: string, input: OrderActionInput = {}) =>
        apiRequest<Order>(`${ORDERS_URL}/${id}/cancel`, {
            method: 'PATCH',
            body: JSON.stringify(input),
        }),

    accept: (id: string) =>
        apiRequest<Order>(`${ORDERS_URL}/${id}/accept`, {
            method: 'PATCH',
        }),

    reject: (id: string, input: OrderActionInput = {}) =>
        apiRequest<Order>(`${ORDERS_URL}/${id}/reject`, {
            method: 'PATCH',
            body: JSON.stringify(input),
        }),
};
