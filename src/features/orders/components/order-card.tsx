import Image from 'next/image';
import Link from 'next/link';
import { OrderStatusBadge } from './order-status-badge';
import type { Order } from '../types';

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    return (
        <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center">
            <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-28">
                {order.itemSnapshot.image ? (
                    <Image
                        src={order.itemSnapshot.image}
                        alt={order.itemSnapshot.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-semibold">{order.itemSnapshot.name}</h2>
                    <OrderStatusBadge status={order.status} />
                </div>

                <p className="text-sm text-muted-foreground">
                    Vendor: {order.itemSnapshot.vendorName}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span>Quantity: {order.quantity}</span>
                    <span>Delivery: {order.deliveryDate}</span>
                    <span>
                        Total: ৳{order.totalPrice.toLocaleString('en-BD')}
                    </span>
                </div>
            </div>

            <Link
                href={`/dashboard/customer/orders/${order._id}`}
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
                View Details
            </Link>
        </article>
    );
}
