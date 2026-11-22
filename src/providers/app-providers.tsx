'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { MotionProvider } from './motion-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

interface AppProvidersProps {
    children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <ThemeProvider >
            <QueryProvider>
                <MotionProvider>
                    {children}
                    <Toaster position="top-center" richColors theme="system" />
                </MotionProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}
