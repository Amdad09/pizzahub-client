'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { useMenu } from '../hooks/use-menu';

interface RelatedMenuItemsProps {
    category: string;
    currentItemId: string;
}

export function RelatedMenuItems({
    category,
    currentItemId,
}: RelatedMenuItemsProps) {
    const { data, isLoading } = useMenu({
        category,
        page: 1,
        limit: 6,
    });

    const relatedItems = (data?.items ?? [])
        .filter(
            (item) =>
                item._id !== currentItemId &&
                item.status === 'approved' &&
                item.isActive,
        )
        .slice(0, 4);

    if (!isLoading && relatedItems.length === 0) {
        return null;
    }

    return (
        <section className="border-t border-border bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
                <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            Keep exploring
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            You may also love
                        </h2>
                        <p className="mt-3 text-sm text-muted-foreground">
                            More delicious choices from the same category.
                        </p>
                    </div>

                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                    >
                        View all menu
                        <ArrowRight size={17} />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
                            >
                                <div className="aspect-[4/3] bg-muted" />
                                <div className="space-y-3 p-5">
                                    <div className="h-5 w-3/4 rounded bg-muted" />
                                    <div className="h-4 w-full rounded bg-muted" />
                                    <div className="h-5 w-1/3 rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedItems.map((item) => (
                            <Link
                                key={item._id}
                                href={`/menu/${item._id}`}
                                className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                    {item.images[0] ? (
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover transition duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-5xl">
                                            🍕
                                        </div>
                                    )}

                                    <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold capitalize text-white backdrop-blur-md">
                                        {item.category}
                                    </div>

                                    <div className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-lg transition group-hover:opacity-100">
                                        <ArrowUpRight size={19} />
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="line-clamp-1 text-lg font-bold transition group-hover:text-primary">
                                        {item.name}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                                        {item.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                                        <span className="text-xl font-extrabold text-primary">
                                            ৳
                                            {item.price.toLocaleString('en-BD')}
                                        </span>

                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground transition group-hover:text-primary">
                                            Explore
                                            <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
