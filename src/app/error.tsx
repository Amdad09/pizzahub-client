'use client';

import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16 text-foreground">
            <div className="w-full max-w-lg text-center">
                <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertTriangle size={38} />
                </div>

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-destructive">
                    Something went wrong
                </p>

                <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Oops! Something went wrong.
                </h1>

                <p className="mx-auto mb-8 max-w-md leading-7 text-muted-foreground">
                    We encountered an unexpected problem while loading this
                    page. Please try again. If the problem continues, return to
                    the homepage.
                </p>

                {error.digest && (
                    <p className="mb-6 text-xs text-muted-foreground">
                        Error reference: {error.digest}
                    </p>
                )}

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        <RefreshCw size={17} />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 font-semibold transition hover:bg-muted"
                    >
                        <Home size={17} />
                        Go Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
