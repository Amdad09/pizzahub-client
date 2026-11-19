import type {
    AdminUser,
    AdminUserFilters,
    AdminUserListResponse,
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

export async function getAdminUsers(
    filters: AdminUserFilters,
): Promise<AdminUserListResponse> {
    const params = new URLSearchParams({
        page: String(filters.page),
        limit: String(filters.limit),
        role: filters.role,
    });

    if (filters.q.trim()) {
        params.set('q', filters.q.trim());
    }

    const response = await fetch(
        `${API_URL}/v1/admin/users?${params.toString()}`,
        {
            credentials: 'include',
            cache: 'no-store',
        },
    );

    return parseResponse<AdminUserListResponse>(response);
}

export async function updateAdminUserBlockStatus({
    id,
    action,
}: {
    id: string;
    action: 'block' | 'unblock';
}): Promise<{ id: string; isBlocked: boolean }> {
    const response = await fetch(
        `${API_URL}/v1/admin/users/${encodeURIComponent(id)}/${action}`,
        {
            method: 'PATCH',
            credentials: 'include',
        },
    );

    return parseResponse<{ id: string; isBlocked: boolean }>(response);
}

export async function getAdminUserById(id: string): Promise<AdminUser> {
    const response = await fetch(
        `${API_URL}/v1/admin/users/${encodeURIComponent(id)}`,
        {
            credentials: 'include',
            cache: 'no-store',
        },
    );

    return parseResponse<AdminUser>(response);
}
