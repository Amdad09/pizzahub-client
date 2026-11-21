'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MenuGallery } from '@/features/menu/components/menu-gallery';
import { useMenuDetails } from '@/features/menu/hooks/use-menu';
import { OrderForm } from '@/features/orders/components/order-form';

export default function MenuDetailsPage() {
    const params = useParams<{ id: string }>();
    const { data: item, isLoading, isError } = useMenuDetails(params.id);

    if (isLoading) {
        return (
            <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
                <div className="grid animate-pulse gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="aspect-[4/3] rounded-3xl bg-muted sm:aspect-square" />

                    <div className="space-y-5 py-4">
                        <div className="h-4 w-24 rounded bg-muted" />
                        <div className="h-10 w-3/4 rounded bg-muted" />
                        <div className="h-20 rounded bg-muted" />
                        <div className="h-10 w-32 rounded bg-muted" />
                        <div className="h-40 rounded-2xl bg-muted" />
                    </div>
                </div>
            </main>
        );
    }

    if (isError || !item) {
        return (
            <main className="flex min-h-[65vh] items-center justify-center px-4 py-16">
                <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted text-3xl">
                        🍕
                    </div>

                    <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                        Menu item not found
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        Sorry, this pizza may have been removed or is no longer
                        available.
                    </p>

                    <Link
                        href="/menu"
                        className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        Back to menu
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen overflow-hidden bg-background">
            <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:py-14">
                {/* Breadcrumb */}
                <div className="mb-7 sm:mb-10">
                    <Link
                        href="/menu"
                        className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                    >
                        <span aria-hidden="true">←</span>
                        Back to menu
                    </Link>
                </div>

                <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
                    {/* Product Gallery */}
                    <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
                        <MenuGallery images={item.images} name={item.name} />
                    </div>

                    {/* Product Information */}
                    <div className="flex min-w-0 flex-col">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                    {item.category}
                                </span>
                            </div>

                            <h1 className="mt-5 break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                {item.name}
                            </h1>

                            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                                {item.description}
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-3">
                                <span className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                                    ৳{item.price}
                                </span>
                                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                    Freshly prepared
                                </span>
                            </div>
                        </div>

                        {/* Vendor Information */}
                        <div className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-5">
                            <div className="flex items-start gap-4">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                                    🍕
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Prepared by
                                    </p>

                                    <p className="mt-1 break-words font-semibold">
                                        {item.vendorName}
                                    </p>

                                    {item.location && (
                                        <p className="mt-1 break-words text-sm text-muted-foreground">
                                            {item.location}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Section */}
                        <section
                            id="order"
                            className="mt-8 scroll-mt-28 border-t border-border pt-7 sm:mt-10 sm:pt-9"
                        >
                            <div className="mb-6">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                    Make it yours
                                </p>

                                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                                    Place Your Order
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Complete the details below and get your
                                    favorite pizza delivered.
                                </p>
                            </div>

                            <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
                                <OrderForm menuItem={item} />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
