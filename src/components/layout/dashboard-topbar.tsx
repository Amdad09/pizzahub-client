'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
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

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
            <MobileNav role={role} />
            <div>
                <p className="text-sm font-semibold capitalize">
                    {role} Dashboard
                </p>
                <p className="text-xs text-muted-foreground">
                    Welcome back, {name}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                </div>

                <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
                >
                    <LogOut className="size-4" />
                    <span>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
                </button>
            </div>
        </header>
    );
}
