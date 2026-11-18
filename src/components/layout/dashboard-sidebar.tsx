'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/components/shared/logo';
import { dashboardNavigation, type UserRole } from '@/config/navigation';

interface DashboardSidebarProps {
    role: UserRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
    const pathname = usePathname();
    const navigation = dashboardNavigation[role];

    return (
        <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-card lg:block">
            <div className="flex h-16 items-center border-b px-6">
                <Logo />
            </div>

            <nav className="space-y-1 p-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-brand-tomato text-white'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
