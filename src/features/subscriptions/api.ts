import type {
    ApiResponse,
    CheckoutSessionResponse,
    PortalSessionResponse,
    SubscriptionResponse,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';
const SUBSCRIPTIONS_URL = `${API_URL}/v1/subscriptions`;

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const response = await fetch(endpoint, {
        ...options,
        credentials: 'include',
        headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...options.headers,
        },
    });

    const result = (await response.json()) as ApiResponse<T>;

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.');
    }

    return result.data;
}

export const subscriptionsApi = {
    getCurrent: () => apiRequest<SubscriptionResponse>(SUBSCRIPTIONS_URL),

    createCheckout: () =>
        apiRequest<CheckoutSessionResponse>(`${SUBSCRIPTIONS_URL}/checkout`, {
            method: 'POST',
        }),

    createPortal: () =>
        apiRequest<PortalSessionResponse>(`${SUBSCRIPTIONS_URL}/portal`, {
            method: 'POST',
        }),
};
