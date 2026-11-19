import { OrderCard } from './order-card';
import type { Order } from '../types';

interface OrderListProps {
    orders: Order[];
    isLoading?: boolean;
    isError?: boolean;
    emptyMessage?: string;
}

export function OrderList({
    orders,
    isLoading = false,
    isError = false,
    emptyMessage = 'You have not placed any orders yet.',
}: OrderListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="h-36 animate-pulse rounded-xl bg-muted"
                    />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-destructive/30 p-8 text-center">
                <p className="font-medium text-destructive">
                    Failed to load orders.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                    Please try again later.
                </p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
                <h2 className="text-lg font-semibold">No orders found</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
    );
}
