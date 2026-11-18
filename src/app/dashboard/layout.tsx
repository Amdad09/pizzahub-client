import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardTopbar } from '@/components/layout/dashboard-topbar';
import { getSession } from '@/lib/session';

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/sign-in');
    }

    if (session.user.isBlocked) {
        redirect('/sign-in?error=account-blocked');
    }

    return (
        <div className="flex min-h-screen bg-background">
            <div className="hidden lg:block">
                <DashboardSidebar role={session.user.role} />
            </div>

            <div className="min-w-0 flex-1">
                <DashboardTopbar
                    name={session.user.name}
                    email={session.user.email}
                    role={session.user.role}
                />

                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
