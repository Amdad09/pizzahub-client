'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, UserRound } from 'lucide-react';
import { toast } from 'sonner';

import { signOut } from '@/lib/auth-client';
import { MobileNav } from './mobile-nav';
import type { UserRole } from '@/config/navigation';

interface DashboardTopbarProps {
    name: string;
    email: string;
    role: UserRole;
}

export function DashboardTopbar({ name, email, role }: DashboardTopbarProps) {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleSignOut = async () => {
        setIsLoggingOut(true);

        try {
            const { error } = await signOut();

            if (error) {
                toast.error(error.message || 'Failed to sign out');
                return;
            }

            toast.success('Signed out successfully');
            router.replace('/sign-in');
            router.refresh();
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');

    return (
        <header className="sticky top-0 z-70 flex h-20 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            {/* Left section */}
            <div className="flex min-w-0 items-center gap-3">
                <MobileNav role={role} />

                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-tomato">
                        PizzaHub Workspace
                    </p>

                    <h2 className="mt-1 truncate text-sm font-semibold capitalize tracking-tight sm:text-base">
                        {role} Dashboard
                    </h2>
                </div>
            </div>

            {/* Right section */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                <div className="hidden items-center gap-3 sm:flex">
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand-tomato/10 text-sm font-bold text-brand-tomato">
                        {initials || <UserRound className="size-5" />}
                    </div>

                    <div className="hidden min-w-0 md:block">
                        <p className="max-w-40 truncate text-sm font-semibold">
                            {name}
                        </p>
                        <p className="max-w-40 truncate text-xs text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </div>

                <div className="hidden h-8 w-px bg-border sm:block" />

                <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold transition-all hover:border-brand-tomato/40 hover:bg-brand-tomato/5 hover:text-brand-tomato disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
                >
                    <LogOut className="size-4" />

                    <span className="hidden sm:inline">
                        {isLoggingOut ? 'Signing out...' : 'Logout'}
                    </span>
                </button>
            </div>
        </header>
    );
}
