import Link from 'next/link';
import {
    ArrowLeft,
    ArrowRight,
    ChefHat,
    Clock3,
    Heart,
    Pizza,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

import { Logo } from '@/components/shared/logo';
import { SignInForm } from '@/features/auth/components/sign-in-form';

export default function SignInPage() {
    return (
        <main className="grid min-h-screen lg:grid-cols-2">
            {/* Editorial Panel */}
            <section className="relative hidden overflow-hidden bg-[#252824] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
                <div className="pointer-events-none absolute -right-32 top-20 size-[480px] rounded-full border border-white/[0.07]" />
                <div className="pointer-events-none absolute -right-16 top-36 size-[350px] rounded-full border border-white/[0.07]" />
                <div className="pointer-events-none absolute -bottom-40 -left-20 size-[400px] rounded-full bg-[#B94E35]/20 blur-3xl" />

                <div className="relative z-10">
                    <Logo />
                </div>

                <div className="relative z-10 max-w-xl py-16">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-wide text-[#E7B99B]">
                        <Sparkles className="size-3.5" />
                        WELCOME BACK TO PIZZAHUB
                    </div>

                    <h1 className="text-5xl font-bold leading-[1.12] tracking-tight xl:text-6xl">
                        Great taste.
                        <br />
                        Great moments.
                        <br />
                        <span className="font-serif font-normal italic text-[#DDA17F]">
                            Always together.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-md text-base leading-8 text-white/60">
                        Your favorite flavors, trusted restaurants, and
                        delicious moments are just a sign in away.
                    </p>

                    <div className="mt-12 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                            <Pizza className="size-6 text-[#DDA17F]" />
                            <p className="mt-4 text-sm font-semibold">
                                Delicious choices
                            </p>
                            <p className="mt-1 text-xs leading-5 text-white/50">
                                Explore pizzas made with passion.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                            <Heart className="size-6 text-[#DDA17F]" />
                            <p className="mt-4 text-sm font-semibold">
                                Made for you
                            </p>
                            <p className="mt-1 text-xs leading-5 text-white/50">
                                Keep your favorites close.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
                    <span>© {new Date().getFullYear()} PizzaHub</span>
                    <span>Crafted with passion.</span>
                </div>
            </section>

            {/* Sign In Form */}
            <section className="flex min-h-screen flex-col bg-background px-5 py-7 sm:px-10 lg:px-12 xl:px-20">
                <div className="flex items-center justify-between lg:justify-end">
                    <div className="lg:hidden">
                        <Logo />
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-tomato"
                    >
                        <ArrowLeft className="size-4" />
                        <span className="hidden sm:inline">Back to home</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center py-12">
                    <div className="w-full max-w-md">
                        <div className="mb-9">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand-tomato/10 text-brand-tomato">
                                <ChefHat className="size-6" />
                            </div>

                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-tomato">
                                Your PizzaHub account
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Welcome back.
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                Sign in to continue your delicious journey with
                                PizzaHub.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-7">
                            <SignInForm />
                        </div>

                        <p className="mt-7 text-center text-sm text-muted-foreground">
                            New to PizzaHub?{' '}
                            <Link
                                href="/sign-up"
                                className="font-semibold text-brand-tomato transition-colors hover:underline"
                            >
                                Create an account
                                <ArrowRight className="ml-1 inline size-3.5" />
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="size-4 text-brand-tomato" />
                    Secure account access
                </div>
            </section>
        </main>
    );
}
