'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { OrderStatusBadge } from '@/features/orders/components/order-status-badge';
import { OrderTimeline } from '@/features/orders/components/order-timeline';
import {
    useCancelOrder,
    useCustomerOrder,
} from '@/features/orders/hooks/use-orders';

export default function CustomerOrderDetailsPage() {
    const params = useParams<{ id: string }>();

    const { data: order, isLoading, isError } = useCustomerOrder(params.id);
    const cancelOrder = useCancelOrder();

    const handleCancel = async () => {
        if (!order || order.status !== 'pending') return;

        const confirmed = window.confirm(
            'Are you sure you want to cancel this order?',
        );

        if (!confirmed) return;

        try {
            await cancelOrder.mutateAsync({ id: order._id });
            toast.success('Order cancelled successfully.');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to cancel order.',
            );
        }
    };

    if (isLoading) {
        return <main className="py-20">Loading order details...</main>;
    }

    if (isError || !order) {
        return (
            <main className="space-y-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Order not found</h1>
                <Link
                    href="/dashboard/customer/orders"
                    className="text-primary"
                >
                    Back to my orders
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-4xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <Link
                        href="/dashboard/customer/orders"
                        className="text-sm text-primary"
                    >
                        ← Back to my orders
                    </Link>
                    <h1 className="mt-3 text-3xl font-bold">Order Details</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Order ID: {order._id}
                    </p>
                </div>

                <OrderStatusBadge status={order.status} />
            </div>

            <section className="rounded-xl border border-border bg-card p-6">
                <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted sm:w-48">
                        {order.itemSnapshot.image ? (
                            <Image
                                src={order.itemSnapshot.image}
                                alt={order.itemSnapshot.name}
                                fill
                                sizes="192px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                No image
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-3">
                        <h2 className="text-xl font-bold">
                            {order.itemSnapshot.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Prepared by {order.itemSnapshot.vendorName}
                        </p>
                        <p className="text-sm">
                            Unit Price: ৳
                            {order.itemSnapshot.price.toLocaleString('en-BD')}
                        </p>
                        <p className="text-sm">Quantity: {order.quantity}</p>
                        <p className="text-xl font-bold text-primary">
                            Total: ৳{order.totalPrice.toLocaleString('en-BD')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
                <div>
                    <h2 className="mb-3 font-semibold">Delivery Information</h2>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Delivery date: {order.deliveryDate}</p>
                        <p>Address: {order.deliveryAddress}</p>
                        <p>Phone: {order.phone}</p>
                    </div>
                </div>

                <div>
                    <h2 className="mb-3 font-semibold">Additional Note</h2>
                    <p className="text-sm text-muted-foreground">
                        {order.note || 'No additional note.'}
                    </p>
                </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-6">
                <OrderTimeline history={order.statusHistory} />
            </section>

            {order.status === 'pending' && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={cancelOrder.isPending}
                        className="rounded-lg border border-destructive px-5 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                    >
                        {cancelOrder.isPending
                            ? 'Cancelling...'
                            : 'Cancel Order'}
                    </button>
                </div>
            )}
        </main>
    );
}
