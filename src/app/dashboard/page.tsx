import { redirect } from 'next/navigation';

import { getSession } from '@/lib/session';

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect('/sign-in');
    }

    const dashboardRoutes = {
        customer: '/dashboard/customer',
        vendor: '/dashboard/vendor',
        admin: '/dashboard/admin',
    } as const;

    redirect(dashboardRoutes[session.user.role]);
}
