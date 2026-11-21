'use client';

import {
    Check,
    Crown,
    CreditCard,
    Loader2,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

import { useState } from 'react';

import {
    useCreateCheckout,
    useCreatePortal,
    useSubscription,
} from '../hooks/use-subscription';

interface SubscriptionCardProps {
    checkoutStatus: 'success' | 'cancelled' | null;
}

function formatDate(date: string | null): string {
    if (!date) return 'Not available';

    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
}

export function SubscriptionCard({
    checkoutStatus,
}: SubscriptionCardProps) {
    const [actionError, setActionError] = useState<string | null>(null);

    const isVerifying = checkoutStatus === 'success';

    const {
        data,
        isLoading,
        isError,
        error,
    } = useSubscription(isVerifying);

    const checkout = useCreateCheckout();
    const portal = useCreatePortal();

    const isPremium = data?.plan === 'premium';

    async function handleUpgrade() {
        setActionError(null);

        try {
            const result = await checkout.mutateAsync();

            if (!result.checkoutUrl) {
                throw new Error('Checkout URL was not returned.');
            }

            window.location.assign(result.checkoutUrl);
        } catch (error) {
            setActionError(
                error instanceof Error
                    ? error.message
                    : 'Unable to start checkout.',
            );
        }
    }

    async function handleManageBilling() {
        setActionError(null);

        try {
            const result = await portal.mutateAsync();

            window.location.assign(result.portalUrl);
        } catch (error) {
            setActionError(
                error instanceof Error
                    ? error.message
                    : 'Unable to open billing portal.',
            );
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-border bg-card">
                <Loader2 className="size-7 animate-spin text-brand-tomato" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border border-destructive/30 bg-card p-6">
                <p className="font-semibold text-destructive">
                    Unable to load subscription.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                    {error instanceof Error
                        ? error.message
                        : 'Please try again later.'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {checkoutStatus === 'success' && (
                <div
                    className={`rounded-2xl border p-5 ${
                        isPremium
                            ? 'border-emerald-500/30 bg-emerald-500/5'
                            : 'border-amber-500/30 bg-amber-500/5'
                    }`}
                >
                    <div className="flex items-start gap-3">
                        {isPremium ? (
                            <ShieldCheck className="mt-0.5 size-6 text-emerald-600" />
                        ) : (
                            <Loader2 className="mt-0.5 size-6 animate-spin text-amber-600" />
                        )}

                        <div>
                            <h3 className="font-bold">
                                {isPremium
                                    ? 'Payment confirmed!'
                                    : 'Verifying your payment'}
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                {isPremium
                                    ? 'Your Premium subscription is active. You can now publish more menu items.'
                                    : 'Your checkout was successful. We are waiting for verified payment confirmation from Stripe. This page will update automatically.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {checkoutStatus === 'cancelled' && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                    <h3 className="font-bold">Payment cancelled</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Your checkout was cancelled. No subscription upgrade
                        has been applied.
                    </p>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Your current plan
                            </p>

                            <h2 className="mt-2 text-3xl font-bold capitalize">
                                {data.plan}
                            </h2>
                        </div>

                        <div
                            className={`flex size-14 items-center justify-center rounded-2xl ${
                                isPremium
                                    ? 'bg-amber-500/10 text-amber-600'
                                    : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            {isPremium ? (
                                <Crown className="size-7" />
                            ) : (
                                <CreditCard className="size-7" />
                            )}
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl bg-muted/50 p-4">
                        <p className="text-sm text-muted-foreground">
                            Subscription status
                        </p>

                        <p className="mt-1 font-semibold capitalize">
                            {data.subscription?.status ?? 'Free plan'}
                        </p>

                        {data.subscription?.cancelAtPeriodEnd && (
                            <p className="mt-2 text-sm text-amber-600">
                                Cancellation scheduled at the end of your
                                billing period.
                            </p>
                        )}

                        {data.expiresAt && (
                            <p className="mt-3 text-sm text-muted-foreground">
                                {data.subscription?.cancelAtPeriodEnd
                                    ? 'Premium access ends: '
                                    : 'Current period ends: '}
                                {formatDate(data.expiresAt)}
                            </p>
                        )}
                    </div>

                    {isPremium ? (
                        <button
                            type="button"
                            onClick={handleManageBilling}
                            disabled={portal.isPending}
                            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {portal.isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <CreditCard className="size-4" />
                            )}
                            Manage Billing
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleUpgrade}
                            disabled={checkout.isPending}
                            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-tomato px-5 font-semibold text-white transition hover:bg-brand-tomato/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {checkout.isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Sparkles className="size-4" />
                            )}
                            Upgrade to Premium
                        </button>
                    )}
                </section>

                <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex items-center gap-2">
                        <Crown className="size-5 text-amber-500" />
                        <h2 className="text-xl font-bold">
                            Premium Benefits
                        </h2>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Grow your restaurant without menu publishing limits.
                    </p>

                    <ul className="mt-6 space-y-4">
                        {[
                            'Unlimited active menu items',
                            'Publish more than 3 active items',
                            'Premium restaurant experience',
                            'Secure Stripe subscription billing',
                            'Manage your billing and cancellation',
                        ].map((benefit) => (
                            <li
                                key={benefit}
                                className="flex items-start gap-3 text-sm"
                            >
                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                                    <Check className="size-3.5" />
                                </span>
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-7 rounded-xl border border-border p-4">
                        <p className="text-sm font-semibold">
                            Free plan
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Publish up to 3 active menu items.
                        </p>
                    </div>
                </section>
            </div>

            {actionError && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                    {actionError}
                </p>
            )}
        </div>
    );
}