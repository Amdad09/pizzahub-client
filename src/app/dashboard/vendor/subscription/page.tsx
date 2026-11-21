/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/shared/page-header';
import { SubscriptionCard } from '@/features/subscriptions/components/subscription-card';

type CheckoutStatus = 'success' | 'cancelled' | null;

export default function VendorSubscriptionPage() {
    const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const checkout = params.get('checkout');

        if (checkout === 'success' || checkout === 'cancelled') {
            setCheckoutStatus(checkout);

            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);

    return (
        <main className="mx-auto max-w-7xl space-y-8">
            <div>
                <Link
                    href="/dashboard/vendor"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to dashboard
                </Link>

                <PageHeader
                    title="Subscription & Billing"
                    description="Manage your restaurant subscription and unlock more opportunities."
                />
            </div>

            <SubscriptionCard checkoutStatus={checkoutStatus} />
        </main>
    );
}
