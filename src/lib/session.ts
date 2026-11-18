import { cookies } from 'next/headers';

const API_URL = process.env.API_SERVER_URL;

if (!API_URL) {
    throw new Error('API_SERVER_URL is not configured');
}

export interface AuthSession {
    session: {
        id: string;
        userId: string;
        expiresAt: string;
    };
    user: {
        id: string;
        name: string;
        email: string;
        role: 'customer' | 'vendor' | 'admin';
        isBlocked: boolean;
        businessName?: string;
    };
}

export async function getSession(): Promise<AuthSession | null> {
    const cookieStore = await cookies();

    const response = await fetch(`${API_URL}/auth/get-session`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: 'no-store',
    });

    if (response.status === 401) {
        return null;
    }

    if (!response.ok) {
        throw new Error('Failed to retrieve authentication session');
    }

    return (await response.json()) as AuthSession | null;
}
