import { PageHeader } from '@/components/shared/page-header';
import { DashboardLinkCard } from '@/components/shared/dashboard-link-card';

export default function CustomerDashboardPage() {
    return (
        <>
            <PageHeader
                title="Customer Overview"
                description="Manage your orders and discover your next favorite pizza."
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <DashboardLinkCard
                    title="Browse Menu"
                    description="Explore delicious pizzas and find something you love."
                    href="/menu"
                />

                <DashboardLinkCard
                    title="My Orders"
                    description="View your order history and track current orders."
                    href="/dashboard/customer/orders"
                />

                <DashboardLinkCard
                    title="Favorites"
                    description="Keep your favorite menu items in one place."
                    href="/dashboard/customer/favorites"
                />

                <DashboardLinkCard
                    title="Profile Settings"
                    description="Manage your personal account information."
                    href="/dashboard/profile"
                />
            </div>
        </>
    );
}
