import Link from 'next/link';
import {
    ArrowRight,
    Bookmark,
    ChefHat,
    Heart,
    Pizza,
    Sparkles,
    UtensilsCrossed,
} from 'lucide-react';

export default function CustomerFavoritesPage() {
    return (
        <main className="min-h-screen space-y-8 pb-10">
            {/* Page Header */}
            <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-tomato">
                        <Heart className="h-4 w-4 fill-current" />
                        Your personal collection
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        My Favorites
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                        All the delicious things you love, waiting in one place.
                    </p>
                </div>

                <Link
                    href="/menu"
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                    Explore Menu
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </section>

            {/* Favorites Content */}
            <section className="relative isolate overflow-hidden rounded-3xl border border-border bg-card">
                {/* Background Decorations */}
                <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-tomato/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

                <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-16 text-center sm:px-10 sm:py-24">
                    {/* Illustration */}
                    <div className="relative mb-9">
                        <div className="absolute inset-0 scale-150 rounded-full bg-brand-tomato/10 blur-2xl" />

                        <div className="relative flex h-36 w-36 items-center justify-center rounded-[2.5rem] border border-brand-tomato/15 bg-brand-tomato/5 shadow-inner sm:h-44 sm:w-44">
                            <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
                                <Heart className="h-6 w-6 fill-brand-tomato text-brand-tomato" />
                            </div>

                            <div className="absolute -bottom-2 -left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card shadow-lg">
                                <Sparkles className="h-5 w-5 text-amber-500" />
                            </div>

                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-tomato/10 sm:h-28 sm:w-28">
                                <Pizza className="h-14 w-14 text-brand-tomato sm:h-16 sm:w-16" />
                            </div>
                        </div>
                    </div>

                    {/* Empty State Text */}
                    <div className="max-w-lg">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-tomato/20 bg-brand-tomato/5 px-4 py-2 text-xs font-semibold text-brand-tomato">
                            <Bookmark className="h-3.5 w-3.5" />
                            Your collection starts here
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Nothing here yet,
                            <span className="text-brand-tomato"> foodie!</span>
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                            Looks like you haven&apos;t added any favorites yet.
                            Discover delicious meals, explore the menu, and keep
                            your favorite food inspirations close.
                        </p>
                    </div>

                    {/* CTA */}
                    <Link
                        href="/menu"
                        className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <UtensilsCrossed className="h-5 w-5" />
                        Discover Delicious Food
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <p className="mt-5 text-xs text-muted-foreground">
                        Your next favorite meal is just one click away.
                    </p>
                </div>
            </section>

            {/* Bottom Highlights */}
            <section className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-tomato/30">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tomato/10">
                        <Heart className="h-5 w-5 text-brand-tomato" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                        Made for You
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Keep the meals you love close at hand.
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-tomato/30">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                        <ChefHat className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                        Discover More
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Explore delicious options from our menu.
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-tomato/30">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                        Great Food Moments
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Find something delicious for every craving.
                    </p>
                </div>
            </section>
        </main>
    );
}
