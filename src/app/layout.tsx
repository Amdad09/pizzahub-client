import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { AppProviders } from '@/providers/app-providers';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'PizzaHub | Fresh Pizza, Delivered Fast',
        template: '%s | PizzaHub',
    },
    description:
        'Order your favorite pizza from PizzaHub. Discover delicious pizzas, explore menus, and enjoy convenient delivery.',
    applicationName: 'PizzaHub',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
            >
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
