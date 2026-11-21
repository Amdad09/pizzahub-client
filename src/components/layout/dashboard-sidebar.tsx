'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ChevronRight } from 'lucide-react';

import { Logo } from '@/components/shared/logo';
import { dashboardNavigation, type UserRole } from '@/config/navigation';

interface DashboardSidebarProps {
    role: UserRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
    const pathname = usePathname();
    const navigation = dashboardNavigation[role];

    return (
        <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-border/70 bg-card">
            {/* Brand */}
            <div className="flex h-20 items-center border-b border-border/70 px-7">
                <Logo />
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-7">
                <div className="mb-4 px-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Workspace
                    </p>
                </div>

                <nav className="space-y-1.5">
                    {navigation.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== '/dashboard' &&
                                pathname.startsWith(`${item.href}/`));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-brand-tomato text-white shadow-md shadow-brand-tomato/15'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                }`}
                            >
                                <span className="flex items-center gap-3">
                                    <LayoutDashboard
                                        className={`size-4.25 ${
                                            isActive
                                                ? 'text-white'
                                                : 'text-muted-foreground transition-colors group-hover:text-brand-tomato'
                                        }`}
                                    />
                                    {item.label}
                                </span>

                                <ChevronRight
                                    className={`size-4 transition-all ${
                                        isActive
                                            ? 'translate-x-0 opacity-100'
                                            : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                    }`}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom information */}
            <div className="border-t border-border/70 p-5">
                <div className="rounded-xl bg-muted/60 p-4">
                    <p className="text-xs font-semibold text-foreground">
                        Made with passion
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Fresh ingredients. Authentic taste. Every single day.
                    </p>
                    <div className="mt-3 h-1 w-12 rounded-full bg-brand-tomato" />
                </div>
            </div>
        </aside>
    );
}
