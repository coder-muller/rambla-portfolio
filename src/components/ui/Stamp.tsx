import { useId } from 'react';
import LogoSymbol from './LogoSymbol';

type StampProps = {
    city: string;
    country: string;
};

// Linhas de cancelamento do carimbo: as mesmas ondas do logo, repetidas.
const WAVE = 'q9.15 -6.5 18.3 0t18.3 0t18.3 0t18.3 0t18.3 0t18.3 0';

/** Selo postal da Rambla: papel picotado, símbolo da marca e um carimbo dourado com as ondas do logo. */
export default function Stamp({ city, country }: StampProps) {
    const ringId = `postmark-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const place = `${city} · ${country} · `;

    return (
        <div className="relative">
            <div className="stamp-paper drop-shadow-[0_22px_26px_rgba(29,50,75,0.32)]">
                <div className="stamp-face flex aspect-4/5 flex-col items-center justify-between bg-rambla-navy px-2 pb-3 pt-3.5 text-center text-rambla-cream md:pb-4 md:pt-5">
                    <span className="eyebrow text-[6px] tracking-[0.45em] text-rambla-gold-soft md:text-[7px]">Rambla</span>
                    <LogoSymbol tone="light" className="w-[46%]" />
                    <span className="block">
                        <span className="block font-serif text-base italic leading-none md:text-xl">{city}</span>
                        <span className="eyebrow mt-1.5 block text-[6px] tracking-[0.4em] text-rambla-gold-soft md:text-[7px]">{country}</span>
                    </span>
                </div>
            </div>

            <svg
                data-stamp-postmark
                viewBox="0 0 200 90"
                className="pointer-events-none absolute -top-[10%] left-[58%] w-[112%] -rotate-12 overflow-visible text-rambla-gold"
                aria-hidden="true"
            >
                <defs>
                    <path id={ringId} d="M45 45m-27 0a27 27 0 1 1 54 0a27 27 0 1 1-54 0" />
                </defs>
                <g fill="none" stroke="currentColor" strokeLinecap="round">
                    <circle cx="45" cy="45" r="36" strokeWidth="1.6" />
                    <circle cx="45" cy="45" r="21" strokeWidth="0.9" opacity="0.7" />
                    {[31, 45, 59].map((y) => (
                        <path key={y} d={`M90 ${y}${WAVE}`} strokeWidth="1.8" opacity="0.9" />
                    ))}
                </g>
                <text className="fill-current font-sans uppercase" style={{ fontSize: 7.4, letterSpacing: '0.12em' }}>
                    <textPath href={`#${ringId}`} textLength="168" lengthAdjust="spacing">
                        {place.repeat(2)}
                    </textPath>
                </text>
                <path
                    d="M37.5 41.5c2.5-1.6 4.5-1.6 7.5 0s5 1.6 7.5 0M37.5 48.5c2.5-1.6 4.5-1.6 7.5 0s5 1.6 7.5 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
