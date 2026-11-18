import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '@/lib/session';

export default async function CustomerLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getSession();

    if (!session || session.user.role !== 'customer') {
        redirect('/dashboard');
    }

    return children;
}
