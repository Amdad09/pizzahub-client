import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-4 py-20 text-foreground">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-xl text-center">
                <div className="mb-5 text-[110px] font-black leading-none tracking-tighter text-primary sm:text-[150px]">
                    404
                </div>

                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Search size={38} />
                </div>

                <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
                    Oops! Page Not Found
                </h1>

                <p className="mb-9 leading-7 text-muted-foreground">
                    Looks like this page went missing! The page you are looking
                    for may have been removed, renamed, or is temporarily
                    unavailable.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        <Home size={17} />
                        Back to Home
                    </Link>

                    <Link
                        href="/menu"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 font-semibold transition hover:bg-muted"
                    >
                        Explore Menu
                        <ArrowLeft className="rotate-180" size={17} />
                    </Link>
                </div>

                <p className="mt-10 text-sm text-muted-foreground">
                    Hungry? Let&apos;s get you back to some delicious pizza!
                </p>
            </div>
        </main>
    );
}
