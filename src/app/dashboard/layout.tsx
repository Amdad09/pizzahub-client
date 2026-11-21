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
        <div className="min-h-screen bg-muted/30">
            <div className="flex min-h-screen">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                    <DashboardSidebar role={session.user.role} />
                </div>

                {/* Main Dashboard */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <DashboardTopbar
                        name={session.user.name}
                        email={session.user.email}
                        role={session.user.role}
                    />

                    <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                        <div className="mx-auto w-full max-w-[1600px]">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
