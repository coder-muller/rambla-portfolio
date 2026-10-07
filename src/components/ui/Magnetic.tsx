import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, useGSAP, FINE_POINTER, MOTION_OK } from '../../lib/gsap';

type MagneticProps = {
    children: ReactNode;
    strength?: number;
    className?: string;
};

/** Puxa levemente o conteúdo em direção ao cursor (apenas desktop). */
export default function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const element = ref.current;
            if (!element) return;

            const mm = gsap.matchMedia();
            mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
                const xTo = gsap.quickTo(element, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.45)' });
                const yTo = gsap.quickTo(element, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.45)' });

                const handleMove = (event: PointerEvent) => {
                    const rect = element.getBoundingClientRect();
                    xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
                    yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
                };
                const handleLeave = () => {
                    xTo(0);
                    yTo(0);
                };

                element.addEventListener('pointermove', handleMove);
                element.addEventListener('pointerleave', handleLeave);
                return () => {
                    element.removeEventListener('pointermove', handleMove);
                    element.removeEventListener('pointerleave', handleLeave);
                };
            });

            return () => mm.revert();
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={`inline-block will-change-transform ${className}`}>
            {children}
        </div>
    );
}
