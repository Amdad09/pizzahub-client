import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '@/lib/session';

export default async function VendorLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getSession();

    if (!session || session.user.role !== 'vendor') {
        redirect('/dashboard');
    }

    return children;
}
