import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { Logo } from '@/components/shared/logo';

export function Footer() {
    return (
        <footer className="border-t bg-brand-cream">
            <Container className="py-10">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-3">
                        <Logo />

                        <p className="max-w-sm text-sm text-muted-foreground">
                            Fresh pizza, delicious moments. Your favorite food,
                            delivered right to your door.
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/" className="hover:text-brand-tomato">
                            Home
                        </Link>

                        <Link href="/menu" className="hover:text-brand-tomato">
                            Menu
                        </Link>

                        <Link
                            href="/sign-in"
                            className="hover:text-brand-tomato"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} PizzaHub. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
