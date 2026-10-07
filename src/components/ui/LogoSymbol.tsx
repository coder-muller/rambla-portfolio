import { useId } from 'react';
import type { SVGProps } from 'react';
import {
    SYMBOL_DROP,
    SYMBOL_LEAVES,
    SYMBOL_RING,
    SYMBOL_RING_CENTERLINE,
    SYMBOL_VIEWBOX,
    SYMBOL_WAVES,
} from '../../lib/symbol';

type LogoSymbolProps = SVGProps<SVGSVGElement> & {
    /** `brand`: navy + dourado. `light`: creme + dourado, para fundos escuros. */
    tone?: 'brand' | 'light';
    /** Adiciona a máscara que permite animar o arco "se desenhando". */
    drawable?: boolean;
    title?: string;
};

export default function LogoSymbol({ tone = 'brand', drawable = false, title, className, ...props }: LogoSymbolProps) {
    const maskId = `symbol-ring-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const frame = tone === 'light' ? 'fill-rambla-cream' : 'fill-rambla-navy';

    return (
        <svg
            viewBox={SYMBOL_VIEWBOX}
            className={className}
            role={title ? 'img' : undefined}
            aria-label={title}
            aria-hidden={title ? undefined : true}
            {...props}
        >
            {drawable && (
                <defs>
                    <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1310" height="1280">
                        <path
                            data-symbol="ring-draw"
                            d={SYMBOL_RING_CENTERLINE}
                            fill="none"
                            stroke="#fff"
                            strokeWidth="96"
                            pathLength={1}
                            strokeDasharray="1"
                            strokeDashoffset="0"
                        />
                    </mask>
                </defs>
            )}
            <path data-symbol="ring" className={frame} fillRule="evenodd" d={SYMBOL_RING} mask={drawable ? `url(#${maskId})` : undefined} />
            <g data-symbol="waves" className={frame}>
                {SYMBOL_WAVES.map((d) => (
                    <path key={d.slice(0, 16)} data-symbol="wave" d={d} />
                ))}
            </g>
            <g data-symbol="palm" className="fill-rambla-gold">
                {SYMBOL_LEAVES.map((d) => (
                    <path key={d.slice(0, 16)} data-symbol="leaf" d={d} />
                ))}
                <path data-symbol="drop" d={SYMBOL_DROP} />
            </g>
        </svg>
    );
}
