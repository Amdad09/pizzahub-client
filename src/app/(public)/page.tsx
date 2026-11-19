'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    Bike,
    Clock3,
    Flame,
    Leaf,
    ShieldCheck,
    Star,
} from 'lucide-react';

import { useMenu } from '@/features/menu/hooks/use-menu';

const categories = [
    {
        name: 'Classic Pizza',
        icon: '🍕',
        description: 'Timeless pizza favorites',
    },
    { name: 'Cheese Pizza', icon: '🧀', description: 'For cheese lovers' },
    { name: 'Chicken Pizza', icon: '🍗', description: 'Loaded with chicken' },
    { name: 'Vegetarian', icon: '🥬', description: 'Fresh and flavorful' },
];

const benefits = [
    {
        icon: Leaf,
        title: 'Fresh Ingredients',
        description: 'We use carefully selected ingredients for every pizza.',
    },
    {
        icon: Bike,
        title: 'Fast Delivery',
        description: 'Hot and delicious pizza delivered to your doorstep.',
    },
    {
        icon: ShieldCheck,
        title: 'Quality You Trust',
        description: 'Every order is prepared with care and attention.',
    },
    {
        icon: Clock3,
        title: 'Made to Order',
        description: 'Freshly prepared when you place your order.',
    },
];

const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
    }).format(price);

export default function HomePage() {
    const { data, isPending, isError } = useMenu({
        page: 1,
        limit: 6,
    });

    const menuItems = data?.items ?? [];
    const featuredItems = menuItems.slice(0, 6);
    const heroImage = menuItems[0]?.images?.[0];

    return (
        <div className="overflow-hidden bg-background">
            {/* Hero */}
            <section className="relative isolate overflow-hidden bg-[#171713] text-white">
                <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-[#b84b32]/20 blur-[100px]" />
                <div className="absolute -bottom-48 -left-32 size-[450px] rounded-full bg-[#68734b]/20 blur-[100px]" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:min-h-[620px] md:grid-cols-2 md:py-24">
                    <div className="max-w-xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#e6b76b]/30 bg-[#e6b76b]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6b76b]">
                            <Flame className="size-4" />
                            Fresh from our oven
                        </span>

                        <h1 className="mt-7 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                            A little slice
                            <br />
                            of{' '}
                            <span className="text-[#d88b55]">happiness.</span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-8 text-white/65 sm:text-lg">
                            Discover handcrafted pizzas made with fresh
                            ingredients, rich flavors, and a whole lot of love.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="/menu"
                                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#b84b32] px-7 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#a94029]"
                            >
                                Explore Our Menu
                                <ArrowRight className="size-4" />
                            </Link>

                            <Link
                                href="#why-us"
                                className="inline-flex h-12 items-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                Why PizzaHub?
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
                            <div>
                                <p className="text-2xl font-bold text-[#e6b76b]">
                                    Fresh
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    Quality ingredients
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#e6b76b]">
                                    Made
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    With passion
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#e6b76b]">
                                    Hot
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    At your doorstep
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg">
                        <div className="absolute inset-5 rounded-full bg-[#c36a3e]/20 blur-3xl" />

                        <div className="relative aspect-square overflow-hidden rounded-full border border-white/10 bg-[#28251f] p-3 shadow-2xl">
                            {heroImage ? (
                                <Image
                                    src={heroImage}
                                    alt="Freshly prepared PizzaHub pizza"
                                    fill
                                    priority
                                    unoptimized
                                    sizes="(max-width: 768px) 90vw, 45vw"
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-9xl">
                                    🍕
                                </div>
                            )}
                        </div>

                        <div className="absolute -bottom-3 left-0 rounded-2xl border border-white/10 bg-[#292720] px-5 py-4 shadow-xl sm:-left-8">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-full bg-[#b84b32]/20 text-[#e6b76b]">
                                    <Star className="size-5 fill-current" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">
                                        Made with love
                                    </p>
                                    <p className="text-xs text-white/50">
                                        Every single slice
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Menu */}
            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b84b32]">
                            Made for pizza lovers
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Our Featured Pizzas
                        </h2>
                        <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
                            Explore some of the delicious creations prepared by
                            our talented vendors.
                        </p>
                    </div>

                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#b84b32] transition-all hover:gap-3"
                    >
                        View all pizzas
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {isPending ? (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border bg-card"
                            >
                                <div className="aspect-[4/3] animate-pulse bg-muted" />
                                <div className="space-y-3 p-5">
                                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                    <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="mt-10 rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
                        <p className="font-semibold">
                            Unable to load featured pizzas.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Please visit our menu and try again.
                        </p>
                        <Link
                            href="/menu"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#b84b32]"
                        >
                            Browse menu <ArrowRight className="size-4" />
                        </Link>
                    </div>
                ) : featuredItems.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-dashed px-6 py-16 text-center">
                        <span className="text-5xl">🍕</span>
                        <h3 className="mt-4 text-lg font-semibold">
                            Fresh pizzas are coming soon!
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Our vendors are preparing something delicious.
                        </p>
                    </div>
                ) : (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredItems.map((item) => (
                            <Link
                                href={`/menu/${item._id}`}
                                key={item._id}
                                className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                    {item.images[0] ? (
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            unoptimized
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-7xl">
                                            🍕
                                        </div>
                                    )}

                                    <span className="absolute left-4 top-4 rounded-full bg-[#171713]/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-lg font-bold transition-colors group-hover:text-[#b84b32]">
                                            {item.name}
                                        </h3>
                                        <span className="shrink-0 text-base font-bold text-[#b84b32]">
                                            {formatPrice(item.price)}
                                        </span>
                                    </div>

                                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-muted-foreground">
                                        {item.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                                        <span className="text-xs text-muted-foreground">
                                            By {item.vendorName}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#b84b32]">
                                            View details
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Categories */}
            <section className="bg-[#f4f0e8] py-20 text-[#24231e] dark:bg-[#201f1a] dark:text-white lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b84b32]">
                            Find your favorite
                        </p>
                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Explore by Category
                        </h2>
                        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#77756d] dark:text-white/55">
                            Whatever you are craving, there is a perfect slice
                            waiting for you.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={`/menu?category=${encodeURIComponent(category.name)}`}
                                className="group rounded-2xl border border-black/5 bg-white p-6 text-center transition-all hover:-translate-y-2 hover:shadow-lg dark:border-white/10 dark:bg-[#292720]"
                            >
                                <span className="text-5xl transition-transform group-hover:scale-110">
                                    {category.icon}
                                </span>
                                <h3 className="mt-5 font-bold">
                                    {category.name}
                                </h3>
                                <p className="mt-2 text-xs text-[#77756d] dark:text-white/50">
                                    {category.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why PizzaHub */}
            <section
                id="why-us"
                className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24"
            >
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b84b32]">
                        The PizzaHub difference
                    </p>
                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        More than just pizza.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        Great food brings people together. We make every order a
                        little more special.
                    </p>
                </div>

                <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div key={benefit.title} className="text-center">
                                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#b84b32]/10 text-[#b84b32] transition-transform hover:-translate-y-1">
                                    <Icon className="size-7" />
                                </div>
                                <h3 className="mt-5 font-bold">
                                    {benefit.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="px-5 pb-20 sm:px-8 lg:pb-24">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#24231e] px-6 py-16 text-center text-white sm:px-12 lg:py-20">
                    <div className="absolute -right-20 -top-32 size-80 rounded-full bg-[#b84b32]/20 blur-3xl" />
                    <div className="absolute -bottom-40 -left-20 size-80 rounded-full bg-[#758052]/20 blur-3xl" />

                    <div className="relative mx-auto max-w-2xl">
                        <span className="text-5xl">🍕</span>
                        <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-5xl">
                            Your next favorite pizza
                            <span className="text-[#d88b55]"> is waiting.</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/60">
                            Explore our menu, discover new flavors, and make
                            your next meal unforgettable.
                        </p>

                        <Link
                            href="/menu"
                            className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-[#b84b32] px-8 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#a94029]"
                        >
                            Order Your Pizza
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
