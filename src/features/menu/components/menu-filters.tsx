'use client';

import type { MenuFilters } from '../types';

interface MenuFiltersProps {
    filters: MenuFilters;
    onChange: (filters: MenuFilters) => void;
}

const categories = [
    'All',
    'Margherita',
    'Pepperoni',
    'BBQ',
    'Cheese',
    'Vegetarian',
    'Special',
];

export function MenuFiltersBar({ filters, onChange }: MenuFiltersProps) {
    return (
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <input
                    value={filters.q ?? ''}
                    onChange={(event) =>
                        onChange({ ...filters, q: event.target.value, page: 1 })
                    }
                    placeholder="Search pizzas..."
                    className="h-11 rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-primary"
                />

                <select
                    value={filters.category ?? ''}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            category: event.target.value || undefined,
                            page: 1,
                        })
                    }
                    className="h-11 rounded-xl border border-input bg-background px-4"
                >
                    {categories.map((category) => (
                        <option
                            key={category}
                            value={category === 'All' ? '' : category}
                        >
                            {category}
                        </option>
                    ))}
                </select>

                <input
                    value={filters.location ?? ''}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            location: event.target.value,
                            page: 1,
                        })
                    }
                    placeholder="Location..."
                    className="h-11 rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-primary"
                />

                <select
                    value={filters.sort ?? ''}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            sort:
                                (event.target.value as MenuFilters['sort']) ||
                                undefined,
                            page: 1,
                        })
                    }
                    className="h-11 rounded-xl border border-input bg-background px-4"
                >
                    <option value="">Newest first</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>

            <button
                type="button"
                onClick={() =>
                    onChange({
                        page: 1,
                        limit: filters.limit,
                    })
                }
                className="text-sm font-semibold text-primary hover:underline"
            >
                Clear all filters
            </button>
        </div>
    );
}
