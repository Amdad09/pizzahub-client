'use client';

import { useState } from 'react';

import { PageHeader } from '@/components/shared/page-header';
import {
    useAdminUsers,
    useUpdateAdminUserBlockStatus,
} from '@/features/admin/users/hooks/use-admin-users';

import type { AdminUserRoleFilter } from '@/features/admin/users/types';
import Image from 'next/image';

const LIMIT = 10;

export default function AdminUsersPage() {
    const [search, setSearch] = useState('');
    const [role, setRole] = useState<AdminUserRoleFilter>('all');
    const [page, setPage] = useState(1);
    const [confirming, setConfirming] = useState<{
        id: string;
        action: 'block' | 'unblock';
    } | null>(null);

    const filters = {
        q: search,
        role,
        page,
        limit: LIMIT,
    };

    const { data, isLoading, isError, error, refetch } = useAdminUsers(filters);

    const blockMutation = useUpdateAdminUserBlockStatus();

    const handleRoleChange = (value: AdminUserRoleFilter) => {
        setRole(value);
        setPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleBlockAction = (id: string, action: 'block' | 'unblock') => {
        if (confirming?.id === id && confirming.action === action) {
            blockMutation.mutate(
                { id, action },
                {
                    onSuccess: () => setConfirming(null),
                },
            );
            return;
        }

        setConfirming({ id, action });
    };

    return (
        <main className="space-y-6">
            <PageHeader
                title="User Management"
                description="Manage customer and vendor accounts across PizzaHub."
            />

            {/* Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="mt-2 text-2xl font-bold">
                        {data?.pagination.total ?? '—'}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Current Page
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {data?.pagination.page ?? '—'}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Total Pages</p>
                    <p className="mt-2 text-2xl font-bold">
                        {data?.pagination.totalPages ?? '—'}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <section className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="search"
                    value={search}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    placeholder="Search by name, email or business..."
                    className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                />

                <select
                    value={role}
                    onChange={(event) =>
                        handleRoleChange(
                            event.target.value as AdminUserRoleFilter,
                        )
                    }
                    className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                >
                    <option value="all">All Users</option>
                    <option value="customer">Customers</option>
                    <option value="vendor">Vendors</option>
                </select>
            </section>

            {/* Mutation Error */}
            {blockMutation.isError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                    {blockMutation.error instanceof Error
                        ? blockMutation.error.message
                        : 'Failed to update user status.'}
                </div>
            )}

            {/* Table */}
            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <div>
                        <h2 className="font-semibold">Platform Users</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            View and manage registered accounts.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => void refetch()}
                        disabled={isLoading}
                        className="rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
                    >
                        Refresh
                    </button>
                </div>

                {isLoading ? (
                    <div className="space-y-3 p-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-16 animate-pulse rounded-lg bg-muted"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="p-8 text-center">
                        <p className="font-semibold text-destructive">
                            Failed to load users.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {error instanceof Error
                                ? error.message
                                : 'Please try again.'}
                        </p>
                        <button
                            type="button"
                            onClick={() => void refetch()}
                            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                            Try Again
                        </button>
                    </div>
                ) : !data?.items.length ? (
                    <div className="p-12 text-center">
                        <p className="font-semibold">No users found</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Try changing your search or role filter.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-212.5 text-left text-sm">
                                <thead className="bg-muted/50 text-muted-foreground">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            User
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Role
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Status
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Joined
                                        </th>
                                        <th className="px-5 py-3 text-right font-medium">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border">
                                    {data.items.map((user) => {
                                        const isConfirming =
                                            confirming?.id === user.id;

                                        const action = user.isBlocked
                                            ? 'unblock'
                                            : 'block';

                                        return (
                                            <tr
                                                key={user.id}
                                                className="transition hover:bg-muted/30"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {user.image ? (
                                                            <Image
                                                                src={user.image}
                                                                alt={user.name}
                                                                width={48}
                                                                height={48}
                                                                unoptimized
                                                                className="size-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex size-10 items-center justify-center rounded-full bg-muted font-semibold">
                                                                {user.name
                                                                    .charAt(0)
                                                                    .toUpperCase() ||
                                                                    'U'}
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <p className="truncate font-medium">
                                                                {user.name}
                                                            </p>
                                                            <p className="max-w-64 truncate text-xs text-muted-foreground">
                                                                {user.email}
                                                            </p>
                                                            {user.businessName && (
                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    {
                                                                        user.businessName
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize">
                                                        {user.role}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                            user.isBlocked
                                                                ? 'bg-destructive/10 text-destructive'
                                                                : 'bg-emerald-500/10 text-emerald-600'
                                                        }`}
                                                    >
                                                        {user.isBlocked
                                                            ? 'Blocked'
                                                            : 'Active'}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-muted-foreground">
                                                    {user.createdAt
                                                        ? new Date(
                                                              user.createdAt,
                                                          ).toLocaleDateString(
                                                              'en-BD',
                                                              {
                                                                  day: '2-digit',
                                                                  month: 'short',
                                                                  year: 'numeric',
                                                              },
                                                          )
                                                        : '—'}
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    {isConfirming ? (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    blockMutation.isPending
                                                                }
                                                                onClick={() =>
                                                                    handleBlockAction(
                                                                        user.id,
                                                                        action,
                                                                    )
                                                                }
                                                                className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
                                                            >
                                                                {blockMutation.isPending
                                                                    ? 'Updating...'
                                                                    : `Confirm ${action}`}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    blockMutation.isPending
                                                                }
                                                                onClick={() =>
                                                                    setConfirming(
                                                                        null,
                                                                    )
                                                                }
                                                                className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                blockMutation.isPending
                                                            }
                                                            onClick={() =>
                                                                handleBlockAction(
                                                                    user.id,
                                                                    action,
                                                                )
                                                            }
                                                            className={`rounded-lg border px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${
                                                                user.isBlocked
                                                                    ? 'border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10'
                                                                    : 'border-destructive/30 text-destructive hover:bg-destructive/10'
                                                            }`}
                                                        >
                                                            {user.isBlocked
                                                                ? 'Unblock'
                                                                : 'Block'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing{' '}
                                {data.pagination.total === 0
                                    ? 0
                                    : (page - 1) * LIMIT + 1}
                                {' – '}
                                {Math.min(
                                    page * LIMIT,
                                    data.pagination.total,
                                )}{' '}
                                of {data.pagination.total} users
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={page <= 1}
                                    onClick={() =>
                                        setPage((current) =>
                                            Math.max(1, current - 1),
                                        )
                                    }
                                    className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span className="px-2 text-sm text-muted-foreground">
                                    {page} /{' '}
                                    {Math.max(1, data.pagination.totalPages)}
                                </span>

                                <button
                                    type="button"
                                    disabled={
                                        page >= data.pagination.totalPages
                                    }
                                    onClick={() =>
                                        setPage((current) => current + 1)
                                    }
                                    className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
