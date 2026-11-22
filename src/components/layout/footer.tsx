import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone, Pizza } from 'lucide-react';
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

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/Amdad09',
        icon: FaGithub,
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/Amdadul009',
        icon: FaFacebookF,
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/Amdad09_',
        icon: FaInstagram,
    },
    {
        label: 'Portfolio',
        href: 'https://portfolio1-lime-nine-11.vercel.app/',
        icon: FaLink,
    },
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@amdadul_09',
        icon: FaYoutube,
    },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-card text-card-foreground">
            <Container className="py-16 sm:py-20">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand and Social Links */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tomato text-white transition-transform duration-300 group-hover:rotate-[-8deg]">
                                <Pizza className="size-6" />
                            </span>

                            <span className="text-2xl font-extrabold tracking-tight">
                                Pizza
                                <span className="text-brand-tomato">Hub</span>
                            </span>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-8 text-muted-foreground">
                            A little slice of happiness. Discover delicious
                            pizzas, explore new flavors, and enjoy freshly
                            prepared food delivered to your doorstep.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-brand-tomato hover:bg-brand-tomato hover:text-white"
                                >
                                    <Icon className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
                            Quick Links
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        <ArrowRight className="size-3 text-primary transition-transform group-hover:translate-x-1" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
                            What We Offer
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {services.map((service) => (
                                <li
                                    key={service}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                    <span className="size-1.5 shrink-0 rounded-full bg-brand-tomato" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mt-14 grid gap-5 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="size-4 shrink-0 text-primary" />
                        <span>Contact us through PizzaHub</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0 text-primary" />
                        <span>Serving delicious moments</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="size-4 shrink-0 text-primary" />
                        <span>Easy and convenient ordering</span>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p>
                        © {new Date().getFullYear()} PizzaHub. All rights
                        reserved.
                    </p>

                    <p>
                        Made with <span className="text-brand-tomato">♥</span>{' '}
                        for pizza lovers.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
