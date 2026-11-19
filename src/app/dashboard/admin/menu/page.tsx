'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';

import { PageHeader } from '@/components/shared/page-header';
import { useAdminMenuItems } from '@/features/admin/menu/hooks/use-admin-menu';
import Image from 'next/image';

export default function AdminMenuReviewPage() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error, refetch } = useAdminMenuItems({
        q: search,
        page,
        limit: 10,
    });

    const items = data?.items ?? [];
    const pagination = data?.pagination;

    return (
        <main className="space-y-8">
            <PageHeader
                title="Menu Review"
                description="Review restaurant menu submissions and approve or reject them."
            />

            <section className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Pending submissions
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                        {pagination?.total ?? '—'}
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Current page
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                        {pagination?.page ?? '—'}
                    </p>
                </div>
            </section>

            <section className="space-y-5 rounded-2xl border border-border bg-card p-5">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                        placeholder="Search menu, vendor, category..."
                        className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>

                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-20 animate-pulse rounded-xl bg-muted"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="py-12 text-center">
                        <p className="text-sm text-destructive">
                            {error.message}
                        </p>
                        <button
                            onClick={() => refetch()}
                            className="mt-4 rounded-lg border border-border px-4 py-2 text-sm"
                        >
                            Try again
                        </button>
                    </div>
                ) : items.length === 0 ? (
                    <div className="py-16 text-center">
                        <ClipboardList className="mx-auto size-10 text-muted-foreground" />
                        <h3 className="mt-4 font-semibold">
                            No pending submissions
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            New vendor submissions will appear here.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-175 text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border text-muted-foreground">
                                        <th className="px-3 py-4 font-medium">
                                            Menu item
                                        </th>
                                        <th className="px-3 py-4 font-medium">
                                            Vendor
                                        </th>
                                        <th className="px-3 py-4 font-medium">
                                            Category
                                        </th>
                                        <th className="px-3 py-4 font-medium">
                                            Price
                                        </th>
                                        <th className="px-3 py-4 font-medium">
                                            Submitted
                                        </th>
                                        <th className="px-3 py-4 text-right font-medium">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border">
                                    {items.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-3 py-4">
                                                <div className="flex items-center gap-3">
                                                    {item.images[0] ? (
                                                        <Image
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            width={48}
                                                            height={48}
                                                            unoptimized
                                                            className="size-12 rounded-xl object-cover"
                                                        />
                                                    ) : (
                                                        <div className="size-12 rounded-xl bg-muted" />
                                                    )}
                                                    <div>
                                                        <p className="font-medium">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {item.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-3 py-4">
                                                {item.vendorName}
                                            </td>

                                            <td className="px-3 py-4">
                                                {item.category}
                                            </td>

                                            <td className="px-3 py-4 font-medium">
                                                ৳
                                                {item.price.toLocaleString(
                                                    'en-BD',
                                                )}
                                            </td>

                                            <td className="px-3 py-4 text-muted-foreground">
                                                {new Date(
                                                    item.createdAt,
                                                ).toLocaleDateString('en-BD')}
                                            </td>

                                            <td className="px-3 py-4 text-right">
                                                <Link
                                                    href={`/dashboard/admin/menu/${item._id}`}
                                                    className="inline-flex rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
                                                >
                                                    Review
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-4">
                            <p className="text-sm text-muted-foreground">
                                Page {pagination?.page ?? 1} of{' '}
                                {pagination?.totalPages ?? 1}
                                {' · '}
                                {pagination?.total ?? 0} submissions
                            </p>

                            <div className="flex gap-2">
                                <button
                                    disabled={page <= 1}
                                    onClick={() =>
                                        setPage((current) => current - 1)
                                    }
                                    className="rounded-lg border border-border p-2 disabled:opacity-40"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>

                                <button
                                    disabled={
                                        !pagination ||
                                        page >= pagination.totalPages
                                    }
                                    onClick={() =>
                                        setPage((current) => current + 1)
                                    }
                                    className="rounded-lg border border-border p-2 disabled:opacity-40"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
