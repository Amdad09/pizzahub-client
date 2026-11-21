import { Sparkles } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
            <div>
                <div className="mb-3 flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-brand-tomato/10 text-brand-tomato">
                        <Sparkles className="size-3.5" />
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-tomato">
                        PizzaHub Workspace
                    </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {title}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {description}
                </p>
            </div>

            <div className="hidden shrink-0 sm:block">
                <div className="h-1 w-16 rounded-full bg-brand-tomato" />
            </div>
        </div>
    );
}
