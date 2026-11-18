import { PageHeader } from '@/components/shared/page-header';
import { DashboardLinkCard } from '@/components/shared/dashboard-link-card';

export default function VendorDashboardPage() {
    return (
        <>
            <PageHeader
                title="Vendor Overview"
                description="Manage your restaurant, menu items, and customer orders."
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <DashboardLinkCard
                    title="My Menu"
                    description="Create, update, and manage your restaurant menu."
                    href="/dashboard/vendor/menu"
                />

                <DashboardLinkCard
                    title="Customer Orders"
                    description="Review incoming orders and manage their status."
                    href="/dashboard/vendor/orders"
                />

                <DashboardLinkCard
                    title="Subscription"
                    description="View your current plan and explore premium features."
                    href="/dashboard/vendor/subscription"
                />

                <DashboardLinkCard
                    title="Profile Settings"
                    description="Manage your restaurant and account information."
                    href="/dashboard/profile"
                />
            </div>
        </>
    );
}
