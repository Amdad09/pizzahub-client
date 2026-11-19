'use client';

import Link from 'next/link';
import { useState } from 'react';
import { OrderList } from '@/features/orders/components/order-list';
import { useCustomerOrders } from '@/features/orders/hooks/use-orders';
import type { OrderStatus } from '@/features/orders/types';

const filters: { label: string; value: OrderStatus | 'all' }[] = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Cancelled', value: 'cancelled' },
];

export default function CustomerOrdersPage() {
    const [status, setStatus] = useState<OrderStatus | 'all'>('all');
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useCustomerOrders({
        ...(status !== 'all' && { status }),
        page,
        limit: 10,
    });

    const pagination = data?.pagination;

    return (
        <main className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Orders</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Track and manage your pizza orders.
                    </p>
                </div>

                <Link
                    href="/menu"
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                    Browse Menu
                </Link>
            </div>

            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() => {
                            setStatus(filter.value);
                            setPage(1);
                        }}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            status === filter.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border hover:bg-muted'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <OrderList
                orders={data?.items ?? []}
                isLoading={isLoading}
                isError={isError}
                emptyMessage={
                    status === 'all'
                        ? 'Start exploring our menu and place your first order.'
                        : `You don't have any ${status} orders.`
                }
            />

            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-border pt-5">
                    <p className="text-sm text-muted-foreground">
                        Page {pagination.page} of {pagination.totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={page <= 1}
                            onClick={() => setPage((current) => current - 1)}
                            className="rounded-lg border border-border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            disabled={page >= pagination.totalPages}
                            onClick={() => setPage((current) => current + 1)}
                            className="rounded-lg border border-border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
