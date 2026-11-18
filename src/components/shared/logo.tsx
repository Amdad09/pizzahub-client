import Link from 'next/link';
import { Pizza } from 'lucide-react';

interface LogoProps {
    className?: string;
}

export function Logo({ className = '' }: LogoProps) {
    return (
        <Link
            href="/"
            aria-label="PizzaHub home"
            className={`inline-flex items-center gap-2 ${className}`}
        >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-tomato text-white">
                <Pizza size={23} strokeWidth={2.2} />
            </span>

            <span className="text-xl font-extrabold tracking-tight text-brand-text">
                Pizza<span className="text-brand-tomato">Hub</span>
            </span>
        </Link>
    );
}
