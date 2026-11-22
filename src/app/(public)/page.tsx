'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    Bike,
    Clock3,
    Flame,
    Leaf,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

import { useMenu } from '@/features/menu/hooks/use-menu';
import { useSession } from '@/lib/auth-client';

const categories = [
    {
        name: 'Classic Pizza',
        number: '01',
        description: 'Timeless Italian favorites',
        icon: '🍕',
    },
    {
        name: 'Cheese Pizza',
        number: '02',
        description: 'Made for cheese lovers',
        icon: '🧀',
    },
    {
        name: 'Chicken Pizza',
        number: '03',
        description: 'Rich, savory and satisfying',
        icon: '🍗',
    },
    {
        name: 'Vegetarian',
        number: '04',
        description: 'Fresh from the garden',
        icon: '🥬',
    },
];

const benefits = [
    {
        icon: Leaf,
        number: '01',
        title: 'Ingredients that matter',
        description:
            'Thoughtfully selected ingredients come together in every delicious bite.',
    },
    {
        icon: Flame,
        number: '02',
        title: 'Made fresh, every time',
        description:
            'Every pizza is prepared with care when you place your order.',
    },
    {
        icon: Bike,
        number: '03',
        title: 'At your doorstep',
        description:
            'We make it easy to enjoy your favorite pizza wherever you are.',
    },
    {
        icon: ShieldCheck,
        number: '04',
        title: 'Quality you can trust',
        description:
            'A simple promise: delicious food and a better ordering experience.',
    },
];

const marqueeItems = [
    'HANDCRAFTED PIZZA',
    'FRESH INGREDIENTS',
    'MADE WITH PASSION',
    'A SLICE OF HAPPINESS',
];

const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
    }).format(price);

export default function HomePage() {
    const router = useRouter();

    const { data: session, isPending: isSessionLoading } = useSession();

    const { data, isPending, isError } = useMenu({
        page: 1,
        limit: 6,
    });

    const featuredItems = data?.items?.slice(0, 6) ?? [];
    const heroImage = featuredItems[0]?.images?.[0];

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        itemId: string,
    ) => {
        event.preventDefault();

        // Wait until the session status is resolved.
        if (isSessionLoading) return;

        const detailsPath = `/menu/${itemId}`;

        if (!session?.user) {
            router.push(
                `/sign-in?callbackURL=${encodeURIComponent(detailsPath)}`,
            );
            return;
        }

        router.push(detailsPath);
    };

    return (
        <main className="overflow-hidden bg-background text-foreground">
            {/* HERO */}
            <section className="relative isolate min-h-[680px] overflow-hidden bg-[#f4eee5] text-[#252824] transition-colors duration-500 dark:bg-[#191b18] dark:text-[#f7f2e9] lg:min-h-[760px]">
                {/* Background atmosphere */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(185,78,53,0.13),transparent_42%)] dark:bg-[radial-gradient(ellipse_at_75%_45%,rgba(185,78,53,0.18),transparent_42%)]" />

                <div className="pointer-events-none absolute -left-40 top-1/3 size-[420px] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-[#737b55]/15 blur-[120px] dark:bg-[#737b55]/10 motion-reduce:animate-none" />

                <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#252824_0.7px,transparent_0.7px)] [background-size:6px_6px] dark:opacity-[0.035] dark:[background-image:radial-gradient(#fff_0.7px,transparent_0.7px)]" />

                <div className="relative mx-auto grid min-h-[680px] max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:py-20 lg:min-h-[760px] lg:px-16">
                    {/* Hero copy */}
                    <div className="relative z-10 max-w-[660px]">
                        <div className="animate-fade-up inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#b94e35] dark:text-[#d9a66c] sm:text-xs">
                            <span className="h-px w-9 bg-current" />A little
                            taste of Italy
                        </div>

                        <h1 className="animate-fade-up mt-7 font-serif text-[clamp(3.7rem,8vw,7.5rem)] leading-[0.91] tracking-[-0.065em] [animation-delay:120ms]">
                            Crafted
                            <br />
                            with{' '}
                            <span className="font-serif italic text-[#b94e35] dark:text-[#d58b5b]">
                                passion.
                            </span>
                            <br />
                            Served with
                            <br />
                            <span className="font-serif italic text-[#b94e35] dark:text-[#d58b5b]">
                                love.
                            </span>
                        </h1>

                        <p className="animate-fade-up mt-8 max-w-[420px] text-sm leading-8 text-[#625f57] [animation-delay:240ms] dark:text-white/55 sm:text-base">
                            Discover the joy of beautifully made pizza.
                            Thoughtful ingredients, rich flavors and a little
                            something special in every slice.
                        </p>

                        <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-4 [animation-delay:360ms]">
                            <Link
                                href="/menu"
                                className="group inline-flex h-14 items-center gap-5 rounded-full bg-[#b94e35] px-7 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ce6247] hover:shadow-[0_14px_35px_rgba(185,78,53,0.25)]"
                            >
                                Explore the menu
                                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>

                            <Link
                                href="#our-story"
                                className="inline-flex h-14 items-center gap-3 rounded-full px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#625f57] transition-colors hover:text-[#b94e35] dark:text-white/65 dark:hover:text-white"
                            >
                                Discover our story
                                <ArrowDown className="size-4" />
                            </Link>
                        </div>

                        {/* Editorial details */}
                        <div className="animate-fade-up mt-14 grid max-w-[430px] grid-cols-3 border-t border-[#252824]/15 pt-6 [animation-delay:480ms] dark:border-white/10">
                            <div>
                                <p className="font-serif text-2xl italic text-[#b94e35] dark:text-[#d9a66c] sm:text-3xl">
                                    Fresh
                                </p>
                                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#77766e] dark:text-white/40 sm:text-[10px]">
                                    Ingredients
                                </p>
                            </div>

                            <div className="border-l border-[#252824]/15 pl-5 dark:border-white/10">
                                <p className="font-serif text-2xl italic text-[#b94e35] dark:text-[#d9a66c] sm:text-3xl">
                                    Made
                                </p>
                                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#77766e] dark:text-white/40 sm:text-[10px]">
                                    With passion
                                </p>
                            </div>

                            <div className="border-l border-[#252824]/15 pl-5 dark:border-white/10">
                                <p className="font-serif text-2xl italic text-[#b94e35] dark:text-[#d9a66c] sm:text-3xl">
                                    Yours
                                </p>
                                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#77766e] dark:text-white/40 sm:text-[10px]">
                                    To enjoy
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero visual */}
                    <div className="relative mx-auto w-full max-w-[570px] animate-fade-in [animation-delay:250ms]">
                        <div className="absolute inset-[8%] animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-[#b94e35]/20 blur-[80px] motion-reduce:animate-none" />

                        <div className="relative mx-auto aspect-square w-[88%]">
                            <div className="absolute inset-0 animate-[float_7s_ease-in-out_infinite] rounded-full border border-[#b94e35]/20 dark:border-[#d9a66c]/20 motion-reduce:animate-none" />

                            <div className="absolute inset-[5%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-[#b94e35]/30 dark:border-[#d9a66c]/20 motion-reduce:animate-none" />

                            <div className="absolute inset-[10%] overflow-hidden rounded-full border-[7px] border-[#b94e35]/15 bg-[#e8dfd0] shadow-[0_30px_100px_rgba(0,0,0,0.16)] dark:border-[#d9a66c]/15 dark:bg-[#292b24] dark:shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                                <Image
                                    src={heroImage || '/hero.png'}
                                    alt="PizzaHub featured pizza"
                                    fill
                                    priority
                                    unoptimized
                                    sizes="(max-width: 768px) 80vw, 45vw"
                                    className="object-cover transition-transform duration-[1200ms] hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
                            </div>

                            {/* Floating label */}
                            <div className="absolute -right-2 top-[16%] flex size-24 animate-[float_5s_ease-in-out_infinite] flex-col items-center justify-center rounded-full border border-[#b94e35]/30 bg-white/90 text-center shadow-2xl backdrop-blur-md dark:border-[#d9a66c]/40 dark:bg-[#252721] motion-reduce:animate-none sm:size-28">
                                <Sparkles className="mb-1 size-4 text-[#b94e35] dark:text-[#d9a66c]" />

                                <span className="font-serif text-sm italic text-[#252824] dark:text-[#f7f2e9] sm:text-base">
                                    Made
                                </span>

                                <span className="text-[8px] uppercase tracking-[0.2em] text-[#b94e35] dark:text-[#d9a66c]">
                                    with love
                                </span>
                            </div>

                            {/* Freshly prepared label */}
                            <div className="absolute -bottom-1 left-0 rounded-full border border-[#252824]/10 bg-white/90 px-5 py-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#252721] sm:left-[-7%] sm:px-6 sm:py-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex size-9 items-center justify-center rounded-full bg-[#b94e35]/15 text-[#b94e35] dark:bg-[#b94e35]/20 dark:text-[#d9a66c]">
                                        <Clock3 className="size-4" />
                                    </span>

                                    <div>
                                        <p className="text-xs font-semibold text-[#252824] dark:text-white">
                                            Freshly prepared
                                        </p>
                                        <p className="mt-1 text-[10px] text-[#77766e] dark:text-white/45">
                                            Just the way you love it
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-[9px] uppercase tracking-[0.35em] text-[#77766e] dark:text-white/30">
                            GOOD FOOD · GOOD MOOD · PIZZAHUB
                        </p>
                    </div>
                </div>

                {/* Bottom scroll cue */}
                <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[#77766e] dark:text-white/35 lg:flex">
                    <span className="h-px w-8 bg-current opacity-40" />
                    Scroll to discover
                    <span className="h-px w-8 bg-current opacity-40" />
                </div>
            </section>

            {/* MARQUEE */}
            <section className="overflow-hidden border-y border-[#d9a66c]/20 bg-[#b94e35] py-5 text-white">
                <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap motion-reduce:animate-none">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-8">
                            {marqueeItems.map((label) => (
                                <span
                                    key={`${index}-${label}`}
                                    className="flex items-center gap-8 font-serif text-lg italic tracking-wide sm:text-2xl"
                                >
                                    {label}
                                    <span className="text-[#edc18d]">✳</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURED MENU */}
            <section className="section-padding mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-tomato">
                            A few of our favorites
                        </p>

                        <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            The art of a
                            <br />
                            <span className="italic text-brand-tomato">
                                perfect slice.
                            </span>
                        </h2>
                    </div>

                    <Link
                        href="/menu"
                        className="group inline-flex items-center gap-3 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:text-brand-tomato"
                    >
                        Explore all pizzas
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {isPending ? (
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border border-border bg-card"
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
                    <div className="mt-12 rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
                        <p className="font-semibold">
                            Unable to load featured pizzas.
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Please visit our menu and try again.
                        </p>

                        <Link
                            href="/menu"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-tomato"
                        >
                            Browse menu <ArrowRight className="size-4" />
                        </Link>
                    </div>
                ) : featuredItems.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                        <span className="text-5xl">🍕</span>

                        <h3 className="mt-4 font-serif text-2xl">
                            Something delicious is coming.
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Our vendors are preparing something special.
                        </p>
                    </div>
                ) : (
                    <div className="mt-12 grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredItems.map((item, index) => (
                            <Link
                                href={`/menu/${item._id}`}
                                key={item._id}
                                onClick={(event) =>
                                    handleMenuItemClick(event, item._id)
                                }
                                aria-disabled={isSessionLoading}
                                className="group flex h-full flex-col animate-fade-up rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tomato focus-visible:ring-offset-4"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-[1.4rem] bg-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                                    {item.images?.[0] ? (
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            unoptimized
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-7xl">
                                            🍕
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                                        {item.category}
                                    </span>

                                    <span className="absolute bottom-5 right-5 flex size-11 translate-y-3 items-center justify-center rounded-full bg-[#b94e35] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <ArrowUpRight className="size-5" />
                                    </span>
                                </div>

                                <div className="flex flex-1 items-start justify-between gap-4 px-1 pt-5">
                                    <div className="min-w-0">
                                        <h3 className="line-clamp-1 font-serif text-2xl transition-colors group-hover:text-brand-tomato">
                                            {item.name}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 min-h-12 text-xs leading-6 text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>

                                    <span className="shrink-0 pt-1 text-sm font-bold text-brand-tomato">
                                        {formatPrice(item.price)}
                                    </span>
                                </div>

                                <div className="mx-1 mt-auto flex items-center justify-between border-t border-border/80 pt-3 text-[10px] text-muted-foreground">
                                    <span>By {item.vendorName}</span>

                                    <span className="flex items-center gap-1 uppercase tracking-[0.15em] transition-colors group-hover:text-brand-tomato">
                                        Discover
                                        <ArrowUpRight className="size-3" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* STORY */}
            <section
                id="our-story"
                className="relative overflow-hidden bg-[#f1ece3] text-[#252824] transition-colors duration-500 dark:bg-[#22251f] dark:text-[#f7f2e9]"
            >
                <div className="absolute -right-40 top-0 size-[500px] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-[#737b55]/15 blur-[100px] dark:bg-[#737b55]/10 motion-reduce:animate-none" />

                <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 lg:gap-24 lg:px-16 lg:py-28">
                    <div className="relative">
                        <div className="absolute -left-5 -top-5 font-serif text-8xl text-[#b94e35]/20 dark:text-[#d9a66c]/20">
                            “
                        </div>

                        <p className="relative text-[10px] font-bold uppercase tracking-[0.28em] text-[#b94e35] dark:text-[#d9a66c]">
                            More than just pizza
                        </p>

                        <h2 className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                            Good food has
                            <br />
                            a way of bringing
                            <br />
                            <span className="italic text-[#b94e35] dark:text-[#d58b5b]">
                                us together.
                            </span>
                        </h2>

                        <p className="mt-7 max-w-lg text-sm leading-8 text-[#625f57] dark:text-white/55">
                            We believe every great meal deserves a little
                            attention. From the ingredients to the final slice,
                            PizzaHub is all about making your pizza moments feel
                            special.
                        </p>

                        <Link
                            href="/menu"
                            className="group mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b94e35] dark:text-[#d9a66c]"
                        >
                            Find your favorite
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>

                    <div className="relative mx-auto w-full max-w-[520px]">
                        <div className="absolute -inset-4 rotate-3 rounded-[2rem] border border-[#b94e35]/20 transition-transform duration-700 hover:rotate-1 dark:border-[#d9a66c]/20" />

                        <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.7rem] bg-[radial-gradient(ellipse_at_center,rgba(185,78,53,0.3),transparent_65%),#e4d8c8] dark:bg-[radial-gradient(ellipse_at_center,rgba(185,78,53,0.3),transparent_65%),#30332b]">
                            <Image
                                src="/feature.png"
                                alt="A freshly prepared PizzaHub pizza"
                                fill
                                unoptimized
                                sizes="(max-width: 768px) 90vw, 40vw"
                                className="object-cover opacity-90 transition-transform duration-[1200ms] hover:scale-105 dark:opacity-80"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                            <div className="absolute bottom-8 left-8">
                                <p className="font-serif text-3xl italic text-white sm:text-4xl">
                                    Made for sharing.
                                </p>

                                <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/60">
                                    The PizzaHub feeling
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="section-padding mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
                <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-tomato">
                        Find your kind of delicious
                    </p>

                    <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                        A slice for every mood.
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                        From timeless classics to fresh favorites, discover the
                        pizza that feels just right.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/menu?category=${encodeURIComponent(category.name)}`}
                            className="group relative overflow-hidden rounded-[1.3rem] border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-2 hover:border-brand-tomato/40 hover:shadow-xl sm:p-7"
                        >
                            <div className="absolute -right-12 -top-12 size-32 rounded-full bg-brand-tomato/5 blur-2xl transition-all duration-500 group-hover:bg-brand-tomato/15" />

                            <span className="relative text-[10px] font-bold tracking-[0.2em] text-brand-tomato">
                                {category.number}
                            </span>

                            <div className="relative my-8 inline-block text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg] sm:text-6xl">
                                {category.icon}
                            </div>

                            <h3 className="relative font-serif text-xl sm:text-2xl">
                                {category.name}
                            </h3>

                            <p className="relative mt-2 text-[10px] leading-5 text-muted-foreground sm:text-xs">
                                {category.description}
                            </p>

                            <ArrowUpRight className="absolute right-5 top-5 size-4 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-tomato" />
                        </Link>
                    ))}
                </div>
            </section>

            {/* WHY PIZZAHUB */}
            <section className="bg-[#eee9df] py-20 text-[#252824] transition-colors duration-500 dark:bg-[#22251f] dark:text-[#f7f2e9] lg:py-28">
                <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-tomato">
                                The PizzaHub difference
                            </p>

                            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                                The little things
                                <br />
                                make a <span className="italic">big</span>
                                <br />
                                difference.
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-8 text-[#77766e] dark:text-white/50 lg:justify-self-end">
                            Great pizza is more than what goes on top. It is the
                            care, the quality and the experience behind every
                            order.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <div
                                    key={benefit.number}
                                    className="group border-t border-[#252824]/15 pt-6 transition-all duration-500 hover:-translate-y-1 dark:border-white/15"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-serif text-sm italic text-brand-tomato">
                                            {benefit.number}
                                        </span>

                                        <Icon className="size-5 text-brand-tomato transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-12" />
                                    </div>

                                    <h3 className="mt-8 font-serif text-2xl">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-3 text-xs leading-7 text-[#77766e] dark:text-white/50">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-background px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
                <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#f1ece3] px-6 py-20 text-center text-[#252824] transition-colors duration-500 dark:bg-[#191b18] dark:text-[#f7f2e9] sm:px-12 lg:py-28">
                    <div className="pointer-events-none absolute -right-20 -top-40 size-[450px] animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-[#b94e35]/15 blur-[100px] dark:bg-[#b94e35]/20 motion-reduce:animate-none" />

                    <div className="pointer-events-none absolute -bottom-40 -left-20 size-[400px] animate-[pulse_9s_ease-in-out_infinite] rounded-full bg-[#737b55]/15 blur-[100px] dark:bg-[#737b55]/20 motion-reduce:animate-none" />

                    <div className="relative mx-auto max-w-3xl">
                        <span className="inline-block animate-[float_4s_ease-in-out_infinite] text-5xl motion-reduce:animate-none">
                            🍕
                        </span>

                        <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b94e35] dark:text-[#d9a66c]">
                            Your table is waiting
                        </p>

                        <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl lg:text-7xl">
                            Make today a
                            <br />
                            <span className="italic text-[#b94e35] dark:text-[#d58b5b]">
                                pizza kind of day.
                            </span>
                        </h2>

                        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#77766e] dark:text-white/50">
                            Find your next favorite, explore the menu and make
                            room for one more slice.
                        </p>

                        <Link
                            href="/menu"
                            className="group mt-9 inline-flex h-14 items-center gap-4 rounded-full bg-[#b94e35] px-8 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ce6247] hover:shadow-[0_14px_35px_rgba(185,78,53,0.25)]"
                        >
                            Explore our menu
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
