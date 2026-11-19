import type {
    ApiResponse,
    MenuFilters,
    MenuInput,
    MenuItem,
    MenuListResponse,
} from './types';

const API_URL = '/api/v1/menu';

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            ...(options?.body instanceof FormData
                ? {}
                : { 'Content-Type': 'application/json' }),
            ...options?.headers,
        },
    });

    const result = (await response.json()) as ApiResponse<T>;

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.');
    }

    return result.data;
}

export const menuApi = {
    getAll: (filters: MenuFilters) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.set(key, String(value));
            }
        });

        return apiRequest<MenuListResponse>(`${API_URL}?${params.toString()}`);
    },

    getById: (id: string) => apiRequest<MenuItem>(`${API_URL}/${id}`),

    getVendorItems: () => apiRequest<MenuItem[]>(`${API_URL}/vendor/mine`),
    getVendorItem: (id: string) =>
        apiRequest<MenuItem>(`${API_URL}/vendor/mine/${id}`),
    create: (input: MenuInput) =>
        apiRequest<MenuItem>(`${API_URL}/vendor`, {
            method: 'POST',
            body: JSON.stringify(input),
        }),

    update: (id: string, input: Partial<MenuInput>) =>
        apiRequest<MenuItem>(`${API_URL}/vendor/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(input),
        }),

    remove: (id: string) =>
        apiRequest<null>(`${API_URL}/vendor/${id}`, {
            method: 'DELETE',
        }),
    uploadImage: (image: string) =>
        apiRequest<{ url: string }>(`${API_URL}/vendor/images`, {
            method: 'POST',
            body: JSON.stringify({ image }),
        }),
};
