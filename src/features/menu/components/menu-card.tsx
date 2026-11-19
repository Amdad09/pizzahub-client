import Image from 'next/image';
import Link from 'next/link';
import type { MenuItem } from '../types';

interface MenuCardProps {
    item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/menu/${item._id}`}>
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
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

                <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-lg text-foreground">
                            {item.name}
                        </h3>

                        <span className="shrink-0 font-bold text-primary">
                            ৳{item.price}
                        </span>
                    </div>

                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.category}</span>
                        <span>{item.vendorName}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>⌖</span>
                        <span>{item.location}</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
