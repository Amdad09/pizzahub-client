import { MenuCard } from './menu-card';
import type { MenuItem } from '../types';

interface MenuGridProps {
    items: MenuItem[];
    isLoading?: boolean;
}

export function MenuGrid({ items, isLoading = false }: MenuGridProps) {
    if (isLoading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse overflow-hidden rounded-2xl border border-border"
                    >
                        <div className="aspect-4/3 bg-muted" />
                        <div className="space-y-3 p-5">
                            <div className="h-5 w-3/4 rounded bg-muted" />
                            <div className="h-4 w-full rounded bg-muted" />
                            <div className="h-4 w-1/2 rounded bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
                <h3 className="text-xl font-semibold">No pizzas found</h3>
                <p className="mt-2 text-muted-foreground">
                    Try changing your search or filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <MenuCard key={item._id} item={item} />
            ))}
        </div>
    );
}
