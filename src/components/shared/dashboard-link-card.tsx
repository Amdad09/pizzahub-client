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
            className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-brand-tomato/50 hover:shadow-md"
        >
            <div className="flex items-start justify-between">
                <h2 className="font-semibold">{title}</h2>
                <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-brand-tomato" />
            </div>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
        </Link>
    );
}
