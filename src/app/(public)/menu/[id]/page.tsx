'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    ChefHat,
    MapPin,
    ShoppingBag,
    Sparkles,
} from 'lucide-react';

import { MenuGallery } from '@/features/menu/components/menu-gallery';
import { useMenuDetails } from '@/features/menu/hooks/use-menu';
import { RelatedMenuItems } from '@/features/menu/components/related-menu-items';

export default function MenuDetailsPage() {
    const params = useParams<{ id: string }>();
    const { data: item, isLoading, isError } = useMenuDetails(params.id);

    if (isLoading) {
        return (
            <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6">
                <div className="grid animate-pulse gap-10 lg:grid-cols-2">
                    <div className="aspect-square rounded-3xl bg-muted" />
                    <div className="space-y-6 py-8">
                        <div className="h-5 w-28 rounded bg-muted" />
                        <div className="h-12 w-3/4 rounded bg-muted" />
                        <div className="h-24 rounded bg-muted" />
                        <div className="h-12 w-36 rounded bg-muted" />
                        <div className="h-32 rounded-2xl bg-muted" />
                    </div>
                </div>
            </main>
        );
    }

    if (isError || !item) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-muted text-4xl">
                        🍕
                    </div>
                    <h1 className="mt-6 text-3xl font-bold">
                        Menu item not found
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Sorry, this delicious item is currently unavailable.
                    </p>
                    <Link
                        href="/menu"
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        <ArrowLeft size={17} />
                        Back to menu
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen overflow-hidden bg-background">
            {/* Hero */}
            <section className="relative border-b border-border">
                <div className="pointer-events-none absolute -right-40 -top-40 size-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-orange-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-7 sm:px-6 sm:pb-20 lg:pt-10">
                    <Link
                        href="/menu"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                    >
                        <ArrowLeft size={17} />
                        Explore menu
                    </Link>

                    <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* Gallery */}
                        <div className="min-w-0">
                            <MenuGallery
                                images={item.images}
                                name={item.name}
                            />
                        </div>

                        {/* Product Information */}
                        <div className="min-w-0">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
                                <Sparkles size={14} className="text-primary" />
                                <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                    {item.category}
                                </span>
                            </div>

                            <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                                {item.name}
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
                                {item.description}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <span className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                                    ৳{item.price.toLocaleString('en-BD')}
                                </span>

                                <span className="rounded-full bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">
                                    Freshly prepared
                                </span>
                            </div>

                            {/* Availability */}
                            <div className="mt-7 flex items-center gap-2 text-sm">
                                {item.status === 'approved' && item.isActive ? (
                                    <>
                                        <CheckCircle2
                                            size={17}
                                            className="text-green-600"
                                        />
                                        <span className="font-medium text-green-600">
                                            Available to order
                                        </span>
                                    </>
                                ) : (
                                    <span className="font-medium text-muted-foreground">
                                        Currently unavailable
                                    </span>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="mt-9 flex flex-wrap gap-3">
                                {item.status === 'approved' &&
                                    item.isActive && (
                                        <Link
                                            href={`/menu/${item._id}/order`}
                                            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            <ShoppingBag size={19} />
                                            Order this pizza
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </Link>
                                    )}

                                <Link
                                    href="/menu"
                                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 font-semibold transition hover:border-primary hover:text-primary"
                                >
                                    Explore more
                                    <ArrowUpRight size={17} />
                                </Link>
                            </div>

                            {/* Quick benefits */}
                            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-border pt-7">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <ChefHat size={21} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Made with care
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Vendor prepared
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Quality food
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Carefully prepared
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Story */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
                    <div>
                        <div className="flex items-center gap-2 text-primary">
                            <span className="h-px w-8 bg-primary" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">
                                The food experience
                            </span>
                        </div>

                        <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                            Every bite tells a delicious story.
                        </h2>

                        <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-8 text-muted-foreground">
                            {item.description}
                        </p>

                        <div className="mt-9 rounded-2xl border border-border bg-card p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Sparkles size={21} />
                                </div>
                                <h3 className="text-lg font-bold">
                                    What makes it special?
                                </h3>
                            </div>

                            <p className="mt-4 leading-7 text-muted-foreground">
                                Discover the flavors and preparation details
                                described by the restaurant. Every item has its
                                own character, made to bring something delicious
                                to your table.
                            </p>
                        </div>
                    </div>

                    {/* Vendor Card */}
                    <div>
                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                                🍕
                            </div>

                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                Your food partner
                            </p>

                            <h3 className="mt-2 text-2xl font-bold">
                                Prepared by {item.vendorName}
                            </h3>

                            <div className="mt-6 flex items-start gap-3 border-t border-border pt-6">
                                <MapPin
                                    size={20}
                                    className="mt-0.5 shrink-0 text-primary"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Restaurant location
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        {item.location}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl bg-muted/60 p-4">
                                <p className="text-sm font-medium">
                                    Love this food?
                                </p>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    Place your order and enjoy something
                                    delicious.
                                </p>
                                {item.status === 'approved' &&
                                    item.isActive && (
                                        <Link
                                            href={`/menu/${item._id}/order`}
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                                        >
                                            Order now
                                            <ArrowRight size={16} />
                                        </Link>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <RelatedMenuItems
                category={item.category}
                currentItemId={item._id}
            />
        </main>
    );
}
