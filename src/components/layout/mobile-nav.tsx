/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { Logo } from '@/components/shared/logo';
import { dashboardNavigation, type UserRole } from '@/config/navigation';

interface MobileNavProps {
    role: UserRole;
}

export function MobileNav({ role }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const pathname = usePathname();
    const navigation = dashboardNavigation[role];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;
        const body = document.body;

        const previousStyles = {
            position: body.style.position,
            top: body.style.top,
            width: body.style.width,
            overflow: body.style.overflow,
        };

        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            body.style.position = previousStyles.position;
            body.style.top = previousStyles.top;
            body.style.width = previousStyles.width;
            body.style.overflow = previousStyles.overflow;

            window.removeEventListener('keydown', handleKeyDown);
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open dashboard navigation"
                aria-expanded={isOpen}
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted lg:hidden"
            >
                <Menu className="size-5" />
            </button>

            {mounted &&
                isOpen &&
                createPortal(
                    <div className="fixed inset-0 z-9999 overflow-hidden lg:hidden">
                        {/* Overlay */}
                        <button
                            type="button"
                            aria-label="Close navigation"
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Sidebar */}
                        <aside
                            aria-label="Dashboard navigation"
                            className="absolute inset-y-0 left-0 flex w-[min(18rem,85vw)] flex-col overflow-hidden border-r border-border bg-card shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex h-20 shrink-0 items-center justify-between border-b border-border/70 px-5">
                                <Logo />

                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close navigation"
                                    className="inline-flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            {/* Navigation */}
                            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-7">
                                <div className="mb-4 px-3">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                        Workspace
                                    </p>
                                </div>

                                <nav className="space-y-1.5">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                aria-current={
                                                    isActive
                                                        ? 'page'
                                                        : undefined
                                                }
                                                className={`flex items-center rounded-xl px-3.5 py-3 text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? 'bg-brand-tomato text-white shadow-md shadow-brand-tomato/15'
                                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                                }`}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Footer */}
                            <div className="shrink-0 border-t border-border/70 p-5">
                                <div className="rounded-xl bg-muted/60 p-4">
                                    <p className="text-xs font-semibold text-foreground">
                                        Made with passion
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Fresh ingredients. Authentic taste.
                                        Every single day.
                                    </p>

                                    <div className="mt-3 h-1 w-12 rounded-full bg-brand-tomato" />
                                </div>
                            </div>
                        </aside>
                    </div>,
                    document.body,
                )}
        </>
    );
}
