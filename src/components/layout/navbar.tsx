'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, UserRound, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

import { Container } from '@/components/shared/container';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { signOut, useSession } from '@/lib/auth-client';

const navigation = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
];

export function Navbar() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
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
            router.replace('/');
            router.refresh();
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
            <Container className="flex h-16 items-center justify-between">
                <Logo />

                <nav className="hidden items-center gap-8 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-tomato"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {isPending ? (
                        <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
                    ) : user ? (
                        <details className="group relative">
                            <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent">
                                <UserRound className="size-4" />
                                <span className="max-w-28 truncate">
                                    {user.name}
                                </span>
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>

                            <div className="absolute right-0 mt-2 w-52 rounded-lg border bg-popover p-2 text-popover-foreground shadow-lg">
                                <div className="border-b px-3 py-2">
                                    <p className="truncate text-sm font-medium">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/dashboard"
                                    className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                                >
                                    <LayoutDashboard className="size-4" />
                                    Dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <LogOut className="size-4" />
                                    {isLoggingOut
                                        ? 'Signing out...'
                                        : 'Sign Out'}
                                </button>
                            </div>
                        </details>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/sign-in"
                                className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/sign-up"
                                className="inline-flex h-9 items-center justify-center rounded-md bg-brand-tomato px-4 text-sm font-medium text-white transition-colors hover:bg-brand-tomato/90"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
}
