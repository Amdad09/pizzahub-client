import { PageHeader } from '@/components/shared/page-header';
import { DashboardLinkCard } from '@/components/shared/dashboard-link-card';

export default function AdminDashboardPage() {
    return (
        <>
            <PageHeader
                title="Admin Overview"
                description="Monitor PizzaHub and manage platform operations."
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <DashboardLinkCard
                    title="User Management"
                    description="View users and manage account access."
                    href="/dashboard/admin/users"
                />

                <DashboardLinkCard
                    title="Menu Review"
                    description="Review and manage submitted menu items."
                    href="/dashboard/admin/menu"
                />

                <DashboardLinkCard
                    title="Transactions"
                    description="View subscription payment transactions."
                    href="/dashboard/admin/transactions"
                />

                <DashboardLinkCard
                    title="Profile Settings"
                    description="Manage your administrator account information."
                    href="/dashboard/profile"
                />
            </div>
        </>
    );
}
