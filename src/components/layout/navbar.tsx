'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Menu,
    X,
    LogOut,
    LayoutDashboard,
    UserRound,
    ChevronDown,
    Pizza,
} from 'lucide-react';
import { toast } from 'sonner';

import { Container } from '@/components/shared/container';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { signOut, useSession } from '@/lib/auth-client';

const navigation = [
    { label: 'Home', href: '/' },
    { label: 'Our Menu', href: '/menu' },
];

export function Navbar() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
            <Container className="flex h-18 items-center justify-between">
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2.5"
                >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#b84b32] text-white shadow-sm transition-transform group-hover:rotate-[-8deg]">
                        <Pizza className="size-6" />
                    </span>

                    <span className="text-xl font-extrabold tracking-tight">
                        Pizza<span className="text-[#b84b32]">Hub</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-9 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-[#b84b32]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <ThemeToggle />

                    {isPending ? (
                        <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
                    ) : user ? (
                        <details className="group relative">
                            <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors hover:bg-accent">
                                <UserRound className="size-4" />
                                <span className="max-w-28 truncate">
                                    {user.name}
                                </span>
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>

                            <div className="absolute right-0 mt-3 w-60 rounded-2xl border bg-popover p-2 text-popover-foreground shadow-xl">
                                <div className="border-b px-3 py-3">
                                    <p className="truncate text-sm font-bold">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard"
                                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-accent"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-destructive transition-colors hover:bg-accent disabled:opacity-50"
                                >
                                    <LogOut className="size-4" />
                                    {isLoggingOut
                                        ? 'Signing out...'
                                        : 'Sign Out'}
                                </button>
                            </div>
                        </details>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/sign-up"
                                className="rounded-full bg-[#b84b32] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#a94029]"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />

                    <button
                        type="button"
                        aria-label={
                            isMobileMenuOpen ? 'Close menu' : 'Open menu'
                        }
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="flex size-10 items-center justify-center rounded-xl border transition-colors hover:bg-accent"
                    >
                        {isMobileMenuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </Container>

            {isMobileMenuOpen && (
                <div className="border-t bg-background px-5 py-5 shadow-lg md:hidden">
                    <nav className="flex flex-col gap-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-4 border-t pt-4">
                        {isPending ? (
                            <div className="h-10 animate-pulse rounded-lg bg-muted" />
                        ) : user ? (
                            <>
                                <div className="mb-3 px-4">
                                    <p className="text-sm font-bold">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-accent"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-accent disabled:opacity-50"
                                >
                                    <LogOut className="size-4" />
                                    {isLoggingOut
                                        ? 'Signing out...'
                                        : 'Sign Out'}
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/sign-in"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="rounded-full border px-4 py-3 text-center text-sm font-semibold"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/sign-up"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="rounded-full bg-[#b84b32] px-4 py-3 text-center text-sm font-semibold text-white"
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
