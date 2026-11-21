'use client';

import {
    BadgeCheck,
    Clock3,
    CreditCard,
    Pizza,
    ShieldAlert,
    ShoppingBag,
    Store,
    Users,
    UserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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

interface StatCardProps {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
    variant?: 'default' | 'warning' | 'success';
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    variant = 'default',
}: StatCardProps) {
    const iconStyles = {
        default: 'bg-brand-tomato/10 text-brand-tomato',
        warning: 'bg-amber-500/10 text-amber-600',
        success: 'bg-emerald-500/10 text-emerald-600',
    };

    return (
        <div className="group rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-tomato/30 hover:shadow-lg hover:shadow-brand-tomato/5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                        {value.toLocaleString('en-BD')}
                    </p>
                </div>

                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconStyles[variant]}`}
                >
                    <Icon className="size-5" />
                </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

function SectionHeading({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="mb-5">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-9">
            {[4, 5].map((count, sectionIndex) => (
                <section key={sectionIndex}>
                    <div className="mb-5 h-12 w-48 animate-pulse rounded-lg bg-muted" />

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: count }).map((_, index) => (
                            <div
                                key={index}
                                className="h-36 animate-pulse rounded-2xl border border-border/50 bg-card"
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default function AdminDashboardPage() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['admin', 'overview'],
        queryFn: getAdminOverview,
    });

    return (
        <div className="space-y-9">
            <PageHeader
                title="Admin Overview"
                description="Monitor your platform, manage operations, and keep everything running smoothly."
            />

            {isLoading ? (
                <DashboardSkeleton />
            ) : isError ? (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
                    <div className="flex items-start gap-3">
                        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-destructive" />

                        <div>
                            <p className="font-semibold text-destructive">
                                Failed to load dashboard statistics.
                            </p>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {error instanceof Error
                                    ? error.message
                                    : 'Please try again later.'}
                            </p>
                        </div>
                    </div>
                </div>
            ) : data ? (
                <>
                    {/* User Statistics */}
                    <section>
                        <SectionHeading
                            title="User Statistics"
                            description="An overview of the people using PizzaHub."
                        />

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                title="Total Users"
                                value={data.users.total}
                                description="All registered accounts"
                                icon={Users}
                            />

                            <StatCard
                                title="Customers"
                                value={data.users.customers}
                                description="Registered customer accounts"
                                icon={UserRound}
                            />

                            <StatCard
                                title="Vendors"
                                value={data.users.vendors}
                                description="Registered vendor accounts"
                                icon={Store}
                            />

                            <StatCard
                                title="Blocked Users"
                                value={data.users.blocked}
                                description="Accounts with restricted access"
                                icon={ShieldAlert}
                                variant="warning"
                            />
                        </div>
                    </section>

                    {/* Platform Statistics */}
                    <section>
                        <SectionHeading
                            title="Platform Statistics"
                            description="Track menu activity, orders, and transactions."
                        />

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                title="Total Menu Items"
                                value={data.menu.total}
                                description="All submitted menu items"
                                icon={Pizza}
                            />

                            <StatCard
                                title="Pending Reviews"
                                value={data.menu.pending}
                                description="Menu items awaiting approval"
                                icon={Clock3}
                                variant="warning"
                            />

                            <StatCard
                                title="Approved Menu Items"
                                value={data.menu.approved}
                                description="Approved menu items"
                                icon={BadgeCheck}
                                variant="success"
                            />

                            <StatCard
                                title="Total Orders"
                                value={data.orders.total}
                                description={`${data.orders.pending.toLocaleString('en-BD')} pending orders`}
                                icon={ShoppingBag}
                            />

                            <StatCard
                                title="Transactions"
                                value={data.transactions.total}
                                description="Recorded payment transactions"
                                icon={CreditCard}
                            />
                        </div>
                    </section>
                </>
            ) : null}

            {/* Management */}
            <section>
                <SectionHeading
                    title="Management Center"
                    description="Quick access to your platform management tools."
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <DashboardLinkCard
                        title="User Management"
                        description="View registered users and manage account access and restrictions."
                        href="/dashboard/admin/users"
                    />

                    <DashboardLinkCard
                        title="Menu Review"
                        description="Review submitted menu items and manage their approval status."
                        href="/dashboard/admin/menu"
                    />

                    <DashboardLinkCard
                        title="Transactions"
                        description="View recorded subscription payment transactions."
                        href="/dashboard/admin/transactions"
                    />

                    <DashboardLinkCard
                        title="Profile Settings"
                        description="Manage your administrator account information."
                        href="/dashboard/profile"
                    />
                </div>
            </section>
        </div>
    );
}
