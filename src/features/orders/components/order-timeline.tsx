import { OrderStatusBadge } from './order-status-badge';
import type { OrderStatusHistory } from '../types';

interface OrderTimelineProps {
    history: OrderStatusHistory[];
}

export function OrderTimeline({ history }: OrderTimelineProps) {
    if (history.length === 0) return null;

    return (
        <section className="space-y-5">
            <h2 className="text-xl font-bold">Order History</h2>

            <div className="space-y-5">
                {history.map((entry, index) => (
                    <div
                        key={`${entry.status}-${entry.createdAt}-${index}`}
                        className="flex gap-4"
                    >
                        <div className="flex flex-col items-center">
                            <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                            {index !== history.length - 1 && (
                                <span className="mt-2 h-full w-px bg-border" />
                            )}
                        </div>

                        <div className="flex-1 space-y-2 pb-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <OrderStatusBadge status={entry.status} />
                                <span className="text-xs text-muted-foreground">
                                    {entry.actorRole === 'customer'
                                        ? 'Customer'
                                        : 'Vendor'}
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {new Date(entry.createdAt).toLocaleString(
                                    'en-BD',
                                    {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    },
                                )}
                            </p>

                            {entry.note && (
                                <p className="text-sm">{entry.note}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
