import Link from 'next/link';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Pizza,
    ShieldCheck,
    Sparkles,
    Store,
} from 'lucide-react';

import { Logo } from '@/components/shared/logo';
import { SignUpForm } from '@/features/auth/components/sign-up-form';

export default function SignUpPage() {
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
                        JOIN THE PIZZAHUB COMMUNITY
                    </div>

                    <h1 className="text-5xl font-bold leading-[1.12] tracking-tight xl:text-6xl">
                        A little taste
                        <br />
                        of something
                        <br />
                        <span className="font-serif font-normal italic text-[#DDA17F]">
                            wonderful.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-md text-base leading-8 text-white/60">
                        Whether you love discovering great food or want to share
                        your restaurant with the world, there is a place for you
                        at PizzaHub.
                    </p>

                    <div className="mt-12 space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[#DDA17F]">
                                <Pizza className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">
                                    Discover great food
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    Explore delicious pizzas and restaurants.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[#DDA17F]">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">
                                    Grow your restaurant
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    Manage your menu and customer orders.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[#DDA17F]">
                                <CheckCircle2 className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">
                                    One convenient platform
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    Your PizzaHub experience starts here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
                    <span>© {new Date().getFullYear()} PizzaHub</span>
                    <span>Crafted with passion.</span>
                </div>
            </section>

            {/* Sign Up Form */}
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
                        <div className="mb-8">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand-tomato/10 text-brand-tomato">
                                <Sparkles className="size-6" />
                            </div>

                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-tomato">
                                Become part of PizzaHub
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Create your account.
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                Join PizzaHub and discover a better way to enjoy
                                great pizza.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-7">
                            <SignUpForm />
                        </div>

                        <p className="mt-7 text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link
                                href="/sign-in"
                                className="font-semibold text-brand-tomato transition-colors hover:underline"
                            >
                                Sign in
                                <ArrowRight className="ml-1 inline size-3.5" />
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="size-4 text-brand-tomato" />
                    Your account is protected
                </div>
            </section>
        </main>
    );
}
