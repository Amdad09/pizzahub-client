import Link from 'next/link';
import { ArrowRight, Crown } from 'lucide-react';

export function SubscriptionPrompt() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 via-card to-card p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                        <Crown className="size-6" />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold">
                            Unlock unlimited menu items
                        </h2>

                        <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                            Free plan allows up to 3 active menu items.
                            Upgrade to Premium to publish unlimited active
                            items and manage your restaurant billing.
                        </p>
                    </div>
                </div>

                <Link
                    href="/dashboard/vendor/subscription"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                    Explore Premium
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    );
}