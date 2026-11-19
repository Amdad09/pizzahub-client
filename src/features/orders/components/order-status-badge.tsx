import type { OrderStatus } from '../types';

interface OrderStatusBadgeProps {
    status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
    pending:
        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    accepted:
        'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    cancelled: 'bg-muted text-muted-foreground',
};

const statusLabels: Record<OrderStatus, string> = {
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}
        >
            {statusLabels[status]}
        </span>
    );
}
