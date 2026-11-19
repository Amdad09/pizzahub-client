'use client';

import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@/components/shared/page-header';
import { DashboardLinkCard } from '@/components/shared/dashboard-link-card';

interface AdminOverview {
    users: {
        total: number;
        customers: number;
        vendors: number;
        blocked: number;
    };
    menu: {
        total: number;
        pending: number;
        approved: number;
    };
    orders: {
        total: number;
        pending: number;
    };
    transactions: {
        total: number;
    };
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

async function getAdminOverview(): Promise<AdminOverview> {
    const response = await fetch(`${API_URL}/v1/admin/overview`, {
        credentials: 'include',
        cache: 'no-store',
    });

    const result = (await response.json()) as ApiResponse<AdminOverview>;

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to load admin overview.');
    }

    return result.data;
}

function StatCard({
    title,
    value,
    description,
}: {
    title: string;
    value: number;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p className="mt-3 text-3xl font-bold tracking-tight">
                {value.toLocaleString('en-BD')}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        </div>
    );
}

export default function AdminDashboardPage() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['admin', 'overview'],
        queryFn: getAdminOverview,
    });

    return (
        <main className="space-y-8">
            <PageHeader
                title="Admin Overview"
                description="Monitor PizzaHub and manage platform operations."
            />

            {isLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-32 animate-pulse rounded-xl bg-muted"
                        />
                    ))}
                </div>
            ) : isError ? (
                <div className="rounded-xl border border-destructive/30 p-6">
                    <p className="font-semibold text-destructive">
                        Failed to load dashboard statistics.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {error instanceof Error
                            ? error.message
                            : 'Please try again later.'}
                    </p>
                </div>
            ) : data ? (
                <section className="space-y-6">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">
                            User Statistics
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                title="Total Users"
                                value={data.users.total}
                                description="All registered accounts"
                            />
                            <StatCard
                                title="Customers"
                                value={data.users.customers}
                                description="Registered customers"
                            />
                            <StatCard
                                title="Vendors"
                                value={data.users.vendors}
                                description="Registered vendors"
                            />
                            <StatCard
                                title="Blocked Users"
                                value={data.users.blocked}
                                description="Accounts with restricted access"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">
                            Platform Statistics
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                title="Total Menu Items"
                                value={data.menu.total}
                                description="All submitted menu items"
                            />
                            <StatCard
                                title="Pending Reviews"
                                value={data.menu.pending}
                                description="Menu items awaiting approval"
                            />
                            <StatCard
                                title="Approved Menu Items"
                                value={data.menu.approved}
                                description="Approved and active items"
                            />
                            <StatCard
                                title="Total Orders"
                                value={data.orders.total}
                                description={`${data.orders.pending} pending orders`}
                            />
                            <StatCard
                                title="Transactions"
                                value={data.transactions.total}
                                description="Recorded payment transactions"
                            />
                        </div>
                    </div>
                </section>
            ) : null}

            <section>
                <h2 className="mb-4 text-lg font-semibold">Management</h2>

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
            </section>
        </main>
    );
}
