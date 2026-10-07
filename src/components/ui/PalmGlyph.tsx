import { SYMBOL_DROP, SYMBOL_LEAVES } from '../../lib/symbol';

type PalmGlyphProps = { className?: string };

/** Apenas a palmeira do símbolo, usada como ornamento. */
export default function PalmGlyph({ className = 'h-6 w-6' }: PalmGlyphProps) {
    return (
        <svg viewBox="235 285 840 705" className={`fill-rambla-gold ${className}`} aria-hidden="true">
            {SYMBOL_LEAVES.map((d) => (
                <path key={d.slice(0, 16)} d={d} />
            ))}
            <path d={SYMBOL_DROP} />
        </svg>
    );
}
