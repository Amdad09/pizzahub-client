import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface DashboardLinkCardProps {
    title: string;
    description: string;
    href: string;
}

export function DashboardLinkCard({
    title,
    description,
    href,
}: DashboardLinkCardProps) {
    return (
        <Link
            href={href}
            className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-tomato/40 hover:shadow-xl hover:shadow-brand-tomato/5 sm:p-6"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-brand-tomato/5 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h2 className="text-base font-bold tracking-tight transition-colors group-hover:text-brand-tomato sm:text-lg">
                        {title}
                    </h2>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                        {description}
                    </p>
                </div>

                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-300 group-hover:border-brand-tomato group-hover:bg-brand-tomato group-hover:text-white">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
            </div>

            <div className="relative mt-5 flex items-center gap-2 text-xs font-bold text-brand-tomato">
                Explore
                <span className="h-px w-6 bg-brand-tomato transition-all duration-300 group-hover:w-10" />
            </div>
        </Link>
    );
}
