import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

if (!baseURL) {
    throw new Error('NEXT_PUBLIC_APP_URL is not configured');
}

export const authClient = createAuthClient({
    baseURL,

    plugins: [
        inferAdditionalFields({
            user: {
                role: {
                    type: 'string',
                },
                businessName: {
                    type: 'string',
                },
            },
        }),
    ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
