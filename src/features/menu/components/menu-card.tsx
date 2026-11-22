'use client'
import Image from 'next/image';
import type { MenuItem } from '../types';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

interface MenuCardProps {
    item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    function handleViewDetails() {
        const detailsUrl = `/menu/${item._id}`;

        if (isPending) return;

        if (!session) {
            router.push(`/sign-in?callbackURL=${encodeURIComponent(detailsUrl)}`);
            return;
        }

        router.push(detailsUrl);
    }
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-4/3 shrink-0 overflow-hidden bg-muted">
                <Image
                    src={item.images[0] || '/images/placeholder-pizza.jpg'}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {item.status === 'approved' && (
                    <span className="absolute left-3 top-3 rounded-full bg-olive-700 px-3 py-1 text-xs font-semibold text-white">
                        Available
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                        {item.name}
                    </h3>

                    <span className="shrink-0 font-bold text-primary">
                        ৳{item.price}
                    </span>
                </div>

                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                    {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                    <span className="truncate">{item.category}</span>
                    <span className="truncate">{item.vendorName}</span>
                </div>

                <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                    <span>⌖</span>
                    <span className="truncate">{item.location}</span>
                </div>

                <div className="mt-auto pt-5">
                    <button
                        type="button"
                        onClick={handleViewDetails}
                        disabled={isPending}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </article>
    );
}
