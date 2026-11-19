import type {
    AdminMenuFilters,
    AdminMenuItem,
    AdminMenuListResponse,
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

export async function getAdminMenuItems(
    filters: AdminMenuFilters,
): Promise<AdminMenuListResponse> {
    const params = new URLSearchParams({
        page: String(filters.page),
        limit: String(filters.limit),
    });

    if (filters.q.trim()) {
        params.set('q', filters.q.trim());
    }

    const response = await fetch(
        `${API_URL}/v1/admin/menu?${params.toString()}`,
        {
            credentials: 'include',
            cache: 'no-store',
        },
    );

    return parseResponse<AdminMenuListResponse>(response);
}

export async function getAdminMenuItem(id: string): Promise<AdminMenuItem> {
    const response = await fetch(
        `${API_URL}/v1/admin/menu/${encodeURIComponent(id)}`,
        {
            credentials: 'include',
            cache: 'no-store',
        },
    );

    return parseResponse<AdminMenuItem>(response);
}

export async function reviewAdminMenuItem({
    id,
    action,
    reason,
}: {
    id: string;
    action: 'approve' | 'reject';
    reason?: string;
}): Promise<AdminMenuItem> {
    const response = await fetch(
        `${API_URL}/v1/admin/menu/${encodeURIComponent(id)}/${action}`,
        {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            ...(action === 'reject'
                ? { body: JSON.stringify({ reason }) }
                : {}),
        },
    );

    return parseResponse<AdminMenuItem>(response);
}
