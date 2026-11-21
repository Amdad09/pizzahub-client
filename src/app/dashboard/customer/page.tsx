import Link from 'next/link';
import {
    ArrowRight,
    Pizza,
    ShoppingBag,
    Sparkles,
} from 'lucide-react';

import { PageHeader } from '@/components/shared/page-header';
import { DashboardLinkCard } from '@/components/shared/dashboard-link-card';

export default function CustomerDashboardPage() {
    return (
        <div className="space-y-9">
            <PageHeader
                title="Customer Overview"
                description="Your PizzaHub space to discover delicious food, manage orders, and revisit your favorites."
            />

            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-[#252824] p-6 text-white sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-4 -top-12 size-52 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-24 right-28 size-64 rounded-full bg-[#B94E35]/20 blur-3xl" />

                <div className="relative z-10 max-w-2xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#F0C6A7]">
                        <Sparkles className="size-3.5" />
                        Your PizzaHub Experience
                    </div>

                    <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                        Good food.
                        <br />
                        Great moments.
                        <span className="text-[#DDA17F]"> Every slice.</span>
                    </h2>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
                        Discover handcrafted pizzas, explore delicious flavors,
                        and enjoy your next favorite meal with PizzaHub.
                    </p>

                    <Link
                        href="/menu"
                        className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-[#B94E35] px-5 text-sm font-semibold text-white transition-all hover:bg-[#A3422C]"
                    >
                        Explore the menu
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[35%] items-center justify-center lg:flex">
                    <div className="flex size-44 items-center justify-center rounded-full border border-white/10 bg-white/4">
                        <div className="flex size-32 items-center justify-center rounded-full border border-white/10 bg-white/5">
                            <Pizza
                                className="size-16 text-[#DDA17F]"
                                strokeWidth={1.1}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Access */}
            <section>
                <div className="mb-5">
                    <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                        Your Dashboard
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Everything you need for your PizzaHub experience.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <DashboardLinkCard
                        title="Browse Menu"
                        description="Explore delicious pizzas and discover your next favorite flavor."
                        href="/menu"
                    />

                    <DashboardLinkCard
                        title="My Orders"
                        description="View your order history and keep track of current orders."
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
            </section>

            {/* Customer Guide */}
            <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tomato/10 text-brand-tomato">
                        <ShoppingBag className="size-5" />
                    </div>

                    <div>
                        <h3 className="font-bold">
                            Your next favorite pizza is waiting
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            Browse the menu, choose something delicious, and
                            place an order. You can revisit your order history
                            anytime from your dashboard.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
