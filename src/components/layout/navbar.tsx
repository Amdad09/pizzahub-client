'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
    const pathname = usePathname();

    const { data: session, isPending } = useSession();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [currentHash, setCurrentHash] = useState('');

    const user = session?.user;

    // Keep the current URL hash in sync for Our Story navigation.
    useEffect(() => {
        const updateHash = () => {
            setCurrentHash(window.location.hash);
        };

        updateHash();

        window.addEventListener('hashchange', updateHash);

        return () => {
            window.removeEventListener('hashchange', updateHash);
        };
    }, [pathname]);

    // Determine the active navigation item.
    const isActive = (href: string) => {
        if (href.startsWith('/#')) {
            return pathname === '/' && currentHash === href.slice(1);
        }

        if (href === '/') {
            return pathname === '/' && currentHash !== '#our-story';
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleSignOut = async () => {
        setIsLoggingOut(true);

        try {
            const { error } = await signOut();

            if (error) {
                toast.error(error.message || 'Failed to sign out');
                return;
            }

            toast.success('You have been signed out successfully.');

            closeMobileMenu();
            router.replace('/');
            router.refresh();
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 text-foreground backdrop-blur-xl">
            <Container className="flex h-[76px] items-center justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-3"
                    onClick={closeMobileMenu}
                >
                    <span className="flex size-10 items-center justify-center rounded-full bg-brand-tomato text-white transition-transform duration-500 group-hover:rotate-[-12deg]">
                        <Pizza className="size-5" />
                    </span>

                    <span className="text-[21px] font-bold tracking-[-0.06em]">
                        PIZZA<span className="text-brand-tomato">HUB</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-10 lg:flex">
                    {navigation.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={`relative py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                                    active
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-primary'
                                }`}
                            >
                                {item.label}

                                {active && (
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-primary" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-4 md:flex">
                    <ThemeToggle />

                    {isPending ? (
                        <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
                    ) : user ? (
                        <details className="group relative">
                            <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent">
                                <UserRound className="size-4 text-primary" />

                                <span className="max-w-28 truncate">
                                    {user.name}
                                </span>

                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>

                            <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-border bg-card p-2 text-card-foreground shadow-2xl">
                                <div className="border-b border-border px-3 py-3">
                                    <p className="truncate text-sm font-semibold">
                                        {user.name}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard"
                                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
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
                                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Sign in
                            </Link>

                            <Link
                                href="/sign-up"
                                className="group inline-flex h-11 items-center gap-3 rounded-full bg-brand-tomato px-5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-tomato/90"
                            >
                                Get Started
                                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />

                    <button
                        type="button"
                        aria-label={
                            isMobileMenuOpen ? 'Close menu' : 'Open menu'
                        }
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
                    >
                        {isMobileMenuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="border-t border-border bg-card px-5 py-6 text-card-foreground md:hidden">
                    <nav className="flex flex-col">
                        {navigation.map((item, index) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    aria-current={active ? 'page' : undefined}
                                    className={`flex items-center justify-between border-b border-border py-4 text-sm font-semibold transition-colors ${
                                        active
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-primary'
                                    }`}
                                >
                                    <span>{item.label}</span>

                                    <span
                                        className={`text-xs ${
                                            active
                                                ? 'text-primary'
                                                : 'text-muted-foreground/50'
                                        }`}
                                    >
                                        0{index + 1}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-5">
                        {isPending ? (
                            <div className="h-10 animate-pulse rounded-full bg-muted" />
                        ) : user ? (
                            <>
                                <div className="mb-3 px-1">
                                    <p className="text-sm font-semibold">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
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
                                    className="rounded-full border border-border py-3 text-center text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-accent"
                                >
                                    Sign in
                                </Link>

                                <Link
                                    href="/sign-up"
                                    onClick={closeMobileMenu}
                                    className="rounded-full bg-brand-tomato py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-tomato/90"
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
