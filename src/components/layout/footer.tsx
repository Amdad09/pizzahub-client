import Link from 'next/link';
import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    Pizza,
} from 'lucide-react';
import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLink,
    FaYoutube,
} from 'react-icons/fa6';
import { Container } from '@/components/shared/container';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Menu', href: '/menu' },
    { label: 'Sign In', href: '/sign-in' },
    { label: 'Create Account', href: '/sign-up' },
];

const services = [
    'Fresh Ingredients',
    'Quality Preparation',
    'Easy Ordering',
    'Convenient Delivery',
];

export function Footer() {
    return (
        <footer className="bg-[#171713] text-white">
            <Container className="py-16 sm:py-20">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >
                            <span className="flex size-11 items-center justify-center rounded-xl bg-[#b84b32]">
                                <Pizza className="size-6" />
                            </span>

                            <span className="text-2xl font-extrabold tracking-tight">
                                Pizza<span className="text-[#d88b55]">Hub</span>
                            </span>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-8 text-white/55">
                            A little slice of happiness. Discover delicious
                            pizzas, explore new flavors, and enjoy freshly
                            prepared food delivered to your doorstep.
                        </p>

                        <div className="mt-7 flex gap-3">
                            <a
                                href="https://github.com/Amdad09"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[#b84b32] hover:bg-[#b84b32]"
                            >
                                <FaGithub className="size-4" />
                            </a>
                            <a
                                href="https://www.facebook.com/Amdadul009"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[#b84b32] hover:bg-[#b84b32]"
                            >
                                <FaFacebookF className="size-4" />
                            </a>

                            <a
                                href="https://www.instagram.com/Amdad09_"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[#b84b32] hover:bg-[#b84b32]"
                            >
                                <FaInstagram className="size-4" />
                            </a>
                            <a
                                href="https://portfolio1-lime-nine-11.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[#b84b32] hover:bg-[#b84b32]"
                            >
                                <FaLink className="size-4" />
                            </a>
                            <a
                                href="https://www.youtube.com/@amdadul_09"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[#b84b32] hover:bg-[#b84b32]"
                            >
                                <FaYoutube className="size-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#d88b55]">
                            Quick Links
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
                                    >
                                        <ArrowRight className="size-3 text-[#b84b32]" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#d88b55]">
                            What We Offer
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {services.map((service) => (
                                <li
                                    key={service}
                                    className="flex items-center gap-2 text-sm text-white/55"
                                >
                                    <span className="size-1.5 rounded-full bg-[#b84b32]" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-3 text-sm text-white/55">
                        <Mail className="size-4 shrink-0 text-[#d88b55]" />
                        <span>Contact us through PizzaHub</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-white/55">
                        <MapPin className="size-4 shrink-0 text-[#d88b55]" />
                        <span>Serving delicious moments</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-white/55">
                        <Phone className="size-4 shrink-0 text-[#d88b55]" />
                        <span>Easy and convenient ordering</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p>
                        © {new Date().getFullYear()} PizzaHub. All rights
                        reserved.
                    </p>

                    <p>Made with ❤️ for pizza lovers.</p>
                </div>
            </Container>
        </footer>
    );
}
