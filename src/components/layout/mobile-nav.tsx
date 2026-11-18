'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { dashboardNavigation, type UserRole } from '@/config/navigation';

interface MobileNavProps {
    role: UserRole;
}

export function MobileNav({ role }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navigation = dashboardNavigation[role];

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open dashboard navigation"
                aria-expanded={isOpen}
                className="inline-flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-muted lg:hidden"
            >
                <Menu className="size-5" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/50"
                    />

                    <aside className="absolute inset-y-0 left-0 flex w-[min(18rem,85vw)] flex-col border-r bg-background shadow-xl">
                        <div className="flex h-16 items-center justify-between border-b px-5">
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="text-xl font-bold tracking-tight"
                            >
                                PizzaHub
                            </Link>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close navigation"
                                className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-muted"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        aria-current={
                                            isActive ? 'page' : undefined
                                        }
                                        className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="border-t p-4">
                            <p className="text-xs text-muted-foreground">
                                PizzaHub Dashboard
                            </p>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
}
