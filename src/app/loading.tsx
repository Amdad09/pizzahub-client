export default function Loading() {
    return (
        <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Hero Skeleton */}
                <div className="mb-12 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        <div className="space-y-5">
                            <div className="h-5 w-32 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />

                            <div className="space-y-3">
                                <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
                                <div className="h-10 w-4/5 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
                            </div>

                            <div className="h-4 w-full max-w-sm animate-pulse rounded bg-muted motion-reduce:animate-none" />
                            <div className="h-4 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />

                            <div className="flex gap-3 pt-3">
                                <div className="h-12 w-36 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
                                <div className="h-12 w-32 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
                            </div>
                        </div>

                        <div className="aspect-square w-full animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
                    </div>
                </div>

                {/* Section Heading */}
                <div className="mb-8 space-y-3">
                    <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
                    <div className="mx-auto h-4 w-80 max-w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
                </div>

                {/* Cards Skeleton */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-border bg-card"
                        >
                            <div className="aspect-4/3 animate-pulse bg-muted motion-reduce:animate-none" />

                            <div className="space-y-4 p-5">
                                <div className="h-5 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                                <div className="h-4 w-1/2 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                                <div className="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />

                                <div className="flex items-center justify-between pt-3">
                                    <div className="h-6 w-20 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                                    <div className="h-10 w-28 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
