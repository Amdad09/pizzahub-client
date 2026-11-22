'use client';

import { useState } from 'react';
import { MenuGrid } from '@/features/menu/components/menu-grid';
import { MenuFiltersBar } from '@/features/menu/components/menu-filters';
import { useMenu } from '@/features/menu/hooks/use-menu';
import type { MenuFilters } from '@/features/menu/types';

export default function MenuPage() {
    const [filters, setFilters] = useState<MenuFilters>({
        page: 1,
        limit: 9,
    });

    const { data, isLoading, isError, error } = useMenu(filters);

    return (
        <main className="min-h-screen bg-background">
            <section className="relative isolate overflow-hidden bg-card px-6 py-20 text-center text-card-foreground">
                {/* Decorative Background */}
                <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                        Fresh from our oven
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Explore Our Menu
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
                        Discover handcrafted pizzas made with fresh ingredients
                        and authentic flavors.
                    </p>

                    <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-primary" />
                </div>
            </section>

            <section className="mx-auto max-w-7xl space-y-8 px-6 py-14">
                <MenuFiltersBar filters={filters} onChange={setFilters} />

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Our Pizzas</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {data?.pagination.total ?? 0} delicious options
                        </p>
                    </div>
                </div>

                {isError ? (
                    <div className="rounded-xl border border-destructive/30 p-6 text-center text-destructive">
                        {error.message || 'Failed to load menu.'}
                    </div>
                ) : (
                    <MenuGrid items={data?.items ?? []} isLoading={isLoading} />
                )}

                {data && data.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 pt-6">
                        <button
                            type="button"
                            disabled={filters.page <= 1}
                            onClick={() =>
                                setFilters((current) => ({
                                    ...current,
                                    page: current.page - 1,
                                }))
                            }
                            className="rounded-xl border border-border px-5 py-2 disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-muted-foreground">
                            Page {data.pagination.page} of{' '}
                            {data.pagination.totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={
                                filters.page >= data.pagination.totalPages
                            }
                            onClick={() =>
                                setFilters((current) => ({
                                    ...current,
                                    page: current.page + 1,
                                }))
                            }
                            className="rounded-xl border border-border px-5 py-2 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
