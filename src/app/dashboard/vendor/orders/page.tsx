'use client';

import Link from 'next/link';
import { useState } from 'react';
import { OrderStatusBadge } from '@/features/orders/components/order-status-badge';
import { useVendorOrders } from '@/features/orders/hooks/use-orders';
import type { OrderStatus } from '@/features/orders/types';

const filters: { label: string; value: OrderStatus | 'all' }[] = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Cancelled', value: 'cancelled' },
];

export default function VendorOrdersPage() {
    const [status, setStatus] = useState<OrderStatus | 'all'>('all');
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useVendorOrders({
        ...(status !== 'all' && { status }),
        page,
        limit: 10,
    });

    const pagination = data?.pagination;

    return (
        <main className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Customer Orders</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Manage incoming orders from your customers.
                </p>
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

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-32 animate-pulse rounded-xl bg-muted"
                        />
                    ))}
                </div>
            ) : isError ? (
                <div className="rounded-xl border border-destructive/30 p-8 text-center text-destructive">
                    Failed to load orders. Please try again.
                </div>
            ) : !data?.items.length ? (
                <div className="rounded-xl border border-dashed border-border p-12 text-center">
                    <h2 className="text-lg font-semibold">No orders found</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {status === 'all'
                            ? 'New customer orders will appear here.'
                            : `There are no ${status} orders.`}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.items.map((order) => (
                        <article
                            key={order._id}
                            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0 space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2 className="font-semibold">
                                        {order.itemSnapshot.name}
                                    </h2>
                                    <OrderStatusBadge status={order.status} />
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Order ID: {order._id}
                                </p>

                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                                    <span>Quantity: {order.quantity}</span>
                                    <span>Delivery: {order.deliveryDate}</span>
                                    <span>
                                        Total: ৳
                                        {order.totalPrice.toLocaleString(
                                            'en-BD',
                                        )}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/dashboard/vendor/orders/${order._id}`}
                                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                            >
                                View Order
                            </Link>
                        </article>
                    ))}
                </div>
            )}

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
                            className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            disabled={page >= pagination.totalPages}
                            onClick={() => setPage((current) => current + 1)}
                            className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
