'use client';

import { useState } from 'react';
import { RefreshCw, Search, ReceiptText } from 'lucide-react';

import { PageHeader } from '@/components/shared/page-header';
import { useAdminTransactions } from '@/features/admin/transactions/hooks/use-admin-transactions';
import type { AdminTransactionStatus } from '@/features/admin/transactions/types';

const LIMIT = 10;

const statusStyles: Record<AdminTransactionStatus, string> = {
    paid: 'bg-emerald-500/10 text-emerald-600',
    pending: 'bg-amber-500/10 text-amber-600',
    failed: 'bg-destructive/10 text-destructive',
    refunded: 'bg-blue-500/10 text-blue-600',
};

const zeroDecimalCurrencies = new Set([
    'BIF',
    'CLP',
    'DJF',
    'GNF',
    'JPY',
    'KMF',
    'KRW',
    'MGA',
    'PYG',
    'RWF',
    'UGX',
    'VND',
    'VUV',
    'XAF',
    'XOF',
    'XPF',
]);

const threeDecimalCurrencies = new Set(['BHD', 'JOD', 'KWD', 'OMR', 'TND']);

function formatAmount(amount: number, currency: string) {
    const normalizedCurrency = currency.toUpperCase();

    const exponent = zeroDecimalCurrencies.has(normalizedCurrency)
        ? 0
        : threeDecimalCurrencies.has(normalizedCurrency)
          ? 3
          : 2;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: normalizedCurrency,
        minimumFractionDigits: exponent,
        maximumFractionDigits: exponent,
    }).format(amount / 10 ** exponent);
}

function formatDate(value: string) {
    if (!value) return '—';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return '—';

    return date.toLocaleString('en-BD', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function shortenId(value: string | null) {
    if (!value) return '—';

    if (value.length <= 20) return value;

    return `${value.slice(0, 12)}...${value.slice(-6)}`;
}

export default function AdminTransactionsPage() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error, refetch } = useAdminTransactions({
        q: search,
        page,
        limit: LIMIT,
    });

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <main className="space-y-6">
            <PageHeader
                title="Transactions"
                description="Monitor vendor subscription payments and transaction history across PizzaHub."
            />

            {/* Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Total Transactions
                    </p>
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

            {/* Search */}
            <section className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            handleSearchChange(event.target.value)
                        }
                        placeholder="Search vendor, email or transaction ID..."
                        className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary"
                    />
                </div>
            </section>

            {/* Transactions Table */}
            <section className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <div>
                        <h2 className="font-semibold">Payment Transactions</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Vendor subscription payment records.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => void refetch()}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
                    >
                        <RefreshCw
                            className={`size-4 ${isLoading ? 'animate-spin' : ''}`}
                        />
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
                            Failed to load transactions.
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
                        <ReceiptText className="mx-auto size-10 text-muted-foreground/50" />

                        <p className="mt-4 font-semibold">
                            No transactions found
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {search
                                ? 'Try a different search term.'
                                : 'Vendor subscription transactions will appear here.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-275 text-left text-sm">
                                <thead className="bg-muted/50 text-muted-foreground">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            Vendor
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Transaction
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Payment Reference
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Amount
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Status
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Payment Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border">
                                    {data.items.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="transition hover:bg-muted/30"
                                        >
                                            {/* Vendor */}
                                            <td className="px-5 py-4">
                                                {transaction.vendor ? (
                                                    <div className="min-w-44">
                                                        <p className="font-medium">
                                                            {transaction.vendor
                                                                .name ||
                                                                'Unnamed vendor'}
                                                        </p>

                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {
                                                                transaction
                                                                    .vendor
                                                                    .email
                                                            }
                                                        </p>

                                                        {transaction.vendor
                                                            .businessName && (
                                                            <p className="mt-1 text-xs text-muted-foreground">
                                                                {
                                                                    transaction
                                                                        .vendor
                                                                        .businessName
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">
                                                        Vendor unavailable
                                                    </span>
                                                )}
                                            </td>

                                            {/* Transaction type */}
                                            <td className="px-5 py-4">
                                                <div>
                                                    <p className="font-medium">
                                                        Subscription
                                                    </p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        Vendor billing
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Stripe reference */}
                                            <td className="px-5 py-4">
                                                <div className="space-y-1">
                                                    <p
                                                        className="max-w-48 truncate font-mono text-xs text-muted-foreground"
                                                        title={
                                                            transaction.stripeInvoiceId ??
                                                            transaction.stripePaymentIntentId ??
                                                            'No reference'
                                                        }
                                                    >
                                                        {shortenId(
                                                            transaction.stripeInvoiceId ??
                                                                transaction.stripePaymentIntentId,
                                                        )}
                                                    </p>

                                                    <p className="text-[11px] text-muted-foreground">
                                                        {transaction.stripeInvoiceId
                                                            ? 'Invoice ID'
                                                            : transaction.stripePaymentIntentId
                                                              ? 'Payment Intent'
                                                              : 'No reference'}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-5 py-4">
                                                <span className="font-semibold tabular-nums">
                                                    {formatAmount(
                                                        transaction.amount,
                                                        transaction.currency,
                                                    )}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                        statusStyles[
                                                            transaction.status
                                                        ] ??
                                                        'bg-muted text-muted-foreground'
                                                    }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                                                {formatDate(
                                                    transaction.createdAt,
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {(page - 1) * LIMIT + 1}
                                {' – '}
                                {Math.min(
                                    page * LIMIT,
                                    data.pagination.total,
                                )}{' '}
                                of {data.pagination.total} transactions
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
