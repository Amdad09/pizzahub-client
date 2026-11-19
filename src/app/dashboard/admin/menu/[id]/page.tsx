'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { toast } from 'sonner';

import { PageHeader } from '@/components/shared/page-header';
import {
    useAdminMenuItem,
    useReviewAdminMenuItem,
} from '@/features/admin/menu/hooks/use-admin-menu';
import Image from 'next/image';

export default function AdminMenuReviewDetailsPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const [reason, setReason] = useState('');
    const [confirmAction, setConfirmAction] = useState<
        'approve' | 'reject' | null
    >(null);

    const {
        data: item,
        isLoading,
        isError,
        error,
    } = useAdminMenuItem(params.id);
    const reviewMutation = useReviewAdminMenuItem();

    async function handleReview(action: 'approve' | 'reject') {
        if (action === 'reject' && reason.trim().length < 5) {
            toast.error(
                'Please provide a rejection reason (at least 5 characters).',
            );
            return;
        }

        try {
            await reviewMutation.mutateAsync({
                id: params.id,
                action,
                ...(action === 'reject' ? { reason: reason.trim() } : {}),
            });

            toast.success(
                action === 'approve'
                    ? 'Menu item approved successfully.'
                    : 'Menu item rejected successfully.',
            );

            router.push('/dashboard/admin/menu');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Review action failed.',
            );
        } finally {
            setConfirmAction(null);
        }
    }

    if (isLoading) {
        return (
            <main className="space-y-5">
                <div className="h-8 w-48 animate-pulse rounded bg-muted" />
                <div className="h-72 animate-pulse rounded-2xl bg-muted" />
            </main>
        );
    }

    if (isError || !item) {
        return (
            <main className="space-y-4">
                <p className="text-sm text-destructive">
                    {error instanceof Error
                        ? error.message
                        : 'Menu item not found.'}
                </p>
                <Link
                    href="/dashboard/admin/menu"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                >
                    <ArrowLeft className="size-4" />
                    Back to menu review
                </Link>
            </main>
        );
    }

    return (
        <main className="space-y-8">
            <PageHeader
                title="Review Submission"
                description="Inspect the menu item before making an approval decision."
            />

            <Link
                href="/dashboard/admin/menu"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="size-4" />
                Back to menu review
            </Link>

            <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {item.images.map((image, index) => (
                            <Image
                                key={`${image}-${index}`}
                                src={image}
                                alt={`${item.name} ${index + 1}`}
                                width={400}
                                height={400}
                                unoptimized
                                className="aspect-square w-full rounded-xl object-cover"
                            />
                        ))}
                    </div>

                    <div>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <h2 className="text-2xl font-semibold">
                                {item.name}
                            </h2>
                            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                                {item.status}
                            </span>
                        </div>

                        <p className="mt-2 text-2xl font-semibold">
                            ৳{item.price.toLocaleString('en-BD')}
                        </p>

                        <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                            {item.description}
                        </p>
                    </div>

                    <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Category
                            </p>
                            <p className="mt-1 font-medium">{item.category}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Location
                            </p>
                            <p className="mt-1 font-medium">{item.location}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Vendor
                            </p>
                            <p className="mt-1 font-medium">
                                {item.vendorName}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Submitted
                            </p>
                            <p className="mt-1 font-medium">
                                {new Date(item.createdAt).toLocaleString(
                                    'en-BD',
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <aside className="h-fit space-y-5 rounded-2xl border border-border bg-card p-5">
                    <div>
                        <h3 className="text-lg font-semibold">
                            Review decision
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Approve the submission to publish it, or reject it
                            with a reason.
                        </p>
                    </div>

                    {item.status === 'pending' ? (
                        <>
                            <div className="space-y-2">
                                <label
                                    htmlFor="reason"
                                    className="text-sm font-medium"
                                >
                                    Rejection reason
                                </label>
                                <textarea
                                    id="reason"
                                    value={reason}
                                    onChange={(event) =>
                                        setReason(event.target.value)
                                    }
                                    rows={4}
                                    maxLength={500}
                                    placeholder="Explain what needs to be corrected..."
                                    className="w-full resize-y rounded-xl border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                                />
                                <p className="text-right text-xs text-muted-foreground">
                                    {reason.length}/500
                                </p>
                            </div>

                            <button
                                disabled={reviewMutation.isPending}
                                onClick={() => setConfirmAction('approve')}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                            >
                                <Check className="size-4" />
                                Approve menu item
                            </button>

                            <button
                                disabled={
                                    reviewMutation.isPending ||
                                    reason.trim().length < 5
                                }
                                onClick={() => setConfirmAction('reject')}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 px-4 py-3 text-sm font-semibold text-destructive disabled:opacity-50"
                            >
                                <X className="size-4" />
                                Reject submission
                            </button>
                        </>
                    ) : (
                        <div className="rounded-xl bg-muted p-4">
                            <p className="font-medium capitalize">
                                {item.status}
                            </p>
                            {item.rejectionReason && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {item.rejectionReason}
                                </p>
                            )}
                            <p className="mt-3 text-xs text-muted-foreground">
                                This item has already been reviewed.
                            </p>
                        </div>
                    )}
                </aside>
            </section>

            {confirmAction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="review-dialog-title"
                        className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-6 shadow-xl"
                    >
                        <div>
                            <h3
                                id="review-dialog-title"
                                className="text-lg font-semibold"
                            >
                                {confirmAction === 'approve'
                                    ? 'Approve this menu item?'
                                    : 'Reject this menu item?'}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {confirmAction === 'approve'
                                    ? 'This item will become visible on the public menu.'
                                    : 'This item will be rejected and will not appear on the public menu.'}
                            </p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                disabled={reviewMutation.isPending}
                                onClick={() => setConfirmAction(null)}
                                className="rounded-lg border border-border px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={reviewMutation.isPending}
                                onClick={() => handleReview(confirmAction)}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                            >
                                {reviewMutation.isPending
                                    ? 'Processing...'
                                    : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
