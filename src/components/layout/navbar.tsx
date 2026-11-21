'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowUpRight,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Menu,
    Pizza,
    UserRound,
    X,
} from 'lucide-react';
import { toast } from 'sonner';

import { Container } from '@/components/shared/container';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { signOut, useSession } from '@/lib/auth-client';

const navigation = [
    { label: 'Home', href: '/' },
    { label: 'Our Menu', href: '/menu' },
    { label: 'Our Story', href: '/#our-story' },
];

export function Navbar() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const user = session?.user;

    const handleSignOut = async () => {
        setIsLoggingOut(true);

        try {
            const { error } = await signOut();

            if (error) {
                toast.error(error.message || 'Failed to sign out');
                return;
            }

            toast.success('You have been signed out successfully.');
            setIsMobileMenuOpen(false);
            router.replace('/');
            router.refresh();
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#191b18]/95 text-[#f7f2e9] backdrop-blur-xl">
            <Container className="flex h-[76px] items-center justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-3"
                    onClick={closeMobileMenu}
                >
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#b94e35] text-white transition-transform duration-500 group-hover:rotate-[-12deg]">
                        <Pizza className="size-5" />
                    </span>

                    <span className="text-[21px] font-bold tracking-[-0.06em]">
                        PIZZA<span className="text-[#d58b5b]">HUB</span>
                    </span>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-10 lg:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors duration-300 hover:text-[#e1a16e]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop actions */}
                <div className="hidden items-center gap-4 md:flex">
                    <ThemeToggle />

                    {isPending ? (
                        <div className="h-10 w-28 animate-pulse rounded-full bg-white/10" />
                    ) : user ? (
                        <details className="group relative">
                            <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium transition-colors hover:border-[#d58b5b]/60 hover:bg-white/5">
                                <UserRound className="size-4 text-[#d58b5b]" />
                                <span className="max-w-28 truncate">
                                    {user.name}
                                </span>
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>

                            <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-white/10 bg-[#252721] p-2 shadow-2xl">
                                <div className="border-b border-white/10 px-3 py-3">
                                    <p className="truncate text-sm font-semibold">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-white/45">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard"
                                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-300 transition-colors hover:bg-white/10 disabled:opacity-50"
                                >
                                    <LogOut className="size-4" />
                                    {isLoggingOut
                                        ? 'Signing out...'
                                        : 'Sign out'}
                                </button>
                            </div>
                        </details>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
                            >
                                Sign in
                            </Link>

                            <Link
                                href="/sign-up"
                                className="group inline-flex h-11 items-center gap-3 rounded-full bg-[#b94e35] px-5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ce6247]"
                            >
                                Get Started
                                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile actions */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />

                    <button
                        type="button"
                        aria-label={
                            isMobileMenuOpen ? 'Close menu' : 'Open menu'
                        }
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
                    >
                        {isMobileMenuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </Container>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="border-t border-white/10 bg-[#20221d] px-5 py-6 md:hidden">
                    <nav className="flex flex-col">
                        {navigation.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className="flex items-center justify-between border-b border-white/[0.07] py-4 text-sm font-semibold text-white/75 transition-colors hover:text-[#e1a16e]"
                            >
                                <span>{item.label}</span>
                                <span className="text-xs text-white/25">
                                    0{index + 1}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-5">
                        {isPending ? (
                            <div className="h-10 animate-pulse rounded-full bg-white/10" />
                        ) : user ? (
                            <>
                                <div className="mb-3 px-1">
                                    <p className="text-sm font-semibold">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-white/45">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/75 hover:bg-white/10"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-300 hover:bg-white/10 disabled:opacity-50"
                                >
                                    <LogOut className="size-4" />
                                    {isLoggingOut
                                        ? 'Signing out...'
                                        : 'Sign out'}
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/sign-in"
                                    onClick={closeMobileMenu}
                                    className="rounded-full border border-white/20 py-3 text-center text-xs font-bold uppercase tracking-wider"
                                >
                                    Sign in
                                </Link>

                                <Link
                                    href="/sign-up"
                                    onClick={closeMobileMenu}
                                    className="rounded-full bg-[#b94e35] py-3 text-center text-xs font-bold uppercase tracking-wider"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
