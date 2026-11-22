'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

import { useMenuDetails } from '@/features/menu/hooks/use-menu';
import { OrderForm } from '@/features/orders/components/order-form';

export default function MenuOrderPage() {
    const params = useParams<{ id: string }>();
    const { data: item, isLoading, isError } = useMenuDetails(params.id);

    if (isLoading) {
        return (
            <main className="mx-auto max-w-3xl animate-pulse px-4 py-16">
                <div className="h-8 w-1/2 rounded bg-muted" />
                <div className="mt-8 h-96 rounded-3xl bg-muted" />
            </main>
        );
    }

    if (isError || !item || item.status !== 'approved' || !item.isActive) {
        return (
            <main className="flex min-h-[65vh] items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-5xl">🍕</div>
                    <h1 className="mt-5 text-2xl font-bold">
                        This item is unavailable
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        This menu item cannot be ordered right now.
                    </p>
                    <Link
                        href="/menu"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
                    >
                        <ArrowLeft size={17} />
                        Back to menu
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-3xl">
                <Link
                    href={`/menu/${item._id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                >
                    <ArrowLeft size={17} />
                    Back to product details
                </Link>

                <div className="mt-8">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ShoppingBag size={23} />
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Complete your order
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Place Your Order
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        You are ordering {item.name}. Complete the details below
                        to continue.
                    </p>
                </div>

                <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
                    <div className="mb-7 flex items-center justify-between gap-4 border-b border-border pb-6">
                        <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {item.category}
                            </p>
                        </div>

                        <p className="shrink-0 text-xl font-extrabold text-primary">
                            ৳{item.price.toLocaleString('en-BD')}
                        </p>
                    </div>

                    <OrderForm menuItem={item} />
                </div>
            </div>
        </main>
    );
}
