import { Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import { CTAIcon } from "@/components/features/landing/cta/cta-icon.interface";

export function CTAIcons() {
    const ctaIcons: CTAIcon[] = [
        {
            Icon: Sparkles,
            className: 'absolute top-8 left-12 size-16 text-white/10 rotate-12'
        },
        {
            Icon: Zap,
            className: 'absolute top-20 right-16 size-12 text-white/10 -rotate-12'
        },
        {
            Icon: TrendingUp,
            className: 'absolute bottom-16 left-20 size-14 text-white/10 rotate-45'
        },
        {
            Icon: Star,
            className: 'absolute bottom-24 right-24 size-10 text-white/10 -rotate-12'
        },
        {
            Icon: Sparkles,
            className: 'absolute top-1/2 left-1/4 size-8 text-white/10 rotate-45'
        },
        {
            Icon: Zap,
            className: 'absolute top-1/3 right-1/3 size-10 text-white/10 -rotate-45'
        },
        {
            Icon: Star,
            className: 'absolute bottom-1/3 left-1/3 size-12 text-white/10 rotate-12'
        }
    ]

    return (
        <>
            {ctaIcons.map(({ Icon, className }, index) => (
                <Icon key={index} className={className} />
            ))}
        </>
    )
}
