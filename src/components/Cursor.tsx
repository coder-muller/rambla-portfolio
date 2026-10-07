import { useRef, useState } from 'react';
import { gsap, useGSAP, FINE_POINTER, prefersReducedMotion } from '../lib/gsap';

const INTERACTIVE = 'a, button, [role="button"], label, select, summary';
const TEXT_ENTRY = 'input, textarea';

/** Cursor sutil: ponto dourado + anel que reage a links e mostra rótulos em imagens. */
export default function Cursor() {
    const [enabled] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(FINE_POINTER).matches && !prefersReducedMotion(),
    );
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        const label = labelRef.current;
        if (!enabled || !dot || !ring || !label) return;

        const root = document.documentElement;
        root.classList.add('has-custom-cursor');
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

        const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
        const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

        let visible = false;
        let mode = '';

        const setMode = (next: string, text = '') => {
            if (next === mode && label.textContent === text) return;
            mode = next;
            label.textContent = text;
            const base = { duration: 0.6, ease: 'expo.out', overwrite: 'auto' as const };

            if (next === 'label') {
                gsap.to(ring, { ...base, width: 92, height: 92, backgroundColor: 'rgba(177,128,60,0.92)', borderColor: 'rgba(177,128,60,0)' });
                gsap.to(label, { ...base, opacity: 1, scale: 1 });
                gsap.to(dot, { ...base, scale: 0 });
            } else if (next === 'hover') {
                gsap.to(ring, { ...base, width: 64, height: 64, backgroundColor: 'rgba(177,128,60,0.1)', borderColor: 'rgba(177,128,60,0.6)' });
                gsap.to(label, { ...base, opacity: 0, scale: 0.6 });
                gsap.to(dot, { ...base, scale: 0 });
            } else if (next === 'text') {
                gsap.to(ring, { ...base, width: 8, height: 8, backgroundColor: 'rgba(177,128,60,0)', borderColor: 'rgba(177,128,60,0)' });
                gsap.to(label, { ...base, opacity: 0 });
                gsap.to(dot, { ...base, scale: 0 });
            } else {
                gsap.to(ring, { ...base, width: 36, height: 36, backgroundColor: 'rgba(177,128,60,0)', borderColor: 'rgba(177,128,60,0.7)' });
                gsap.to(label, { ...base, opacity: 0, scale: 0.6 });
                gsap.to(dot, { ...base, scale: 1 });
            }
        };

        const handleMove = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') return;
            if (!visible) {
                visible = true;
                gsap.set([dot, ring], { x: event.clientX, y: event.clientY });
                gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
            }
            dotX(event.clientX);
            dotY(event.clientY);
            ringX(event.clientX);
            ringY(event.clientY);
        };

        const handleOver = (event: PointerEvent) => {
            const target = event.target instanceof Element ? event.target : null;
            const labelled = target?.closest<HTMLElement>('[data-cursor]');
            if (labelled?.dataset.cursor) return setMode('label', labelled.dataset.cursor);
            if (target?.closest(TEXT_ENTRY)) return setMode('text');
            if (target?.closest(INTERACTIVE)) return setMode('hover');
            setMode('default');
        };

        const handleLeave = () => {
            visible = false;
            gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
        };
        const handleDown = () => gsap.to(ring, { scale: 0.82, duration: 0.3, ease: 'power3.out' });
        const handleUp = () => gsap.to(ring, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });

        setMode('default');
        window.addEventListener('pointermove', handleMove, { passive: true });
        document.addEventListener('pointerover', handleOver);
        root.addEventListener('pointerleave', handleLeave);
        window.addEventListener('pointerdown', handleDown);
        window.addEventListener('pointerup', handleUp);

        return () => {
            root.classList.remove('has-custom-cursor');
            window.removeEventListener('pointermove', handleMove);
            document.removeEventListener('pointerover', handleOver);
            root.removeEventListener('pointerleave', handleLeave);
            window.removeEventListener('pointerdown', handleDown);
            window.removeEventListener('pointerup', handleUp);
        };
    });

    if (!enabled) return null;

    return (
        <>
            <div
                ref={ringRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-100 flex h-9 w-9 items-center justify-center rounded-full border border-rambla-gold/70 opacity-0"
            >
                <span ref={labelRef} className="eyebrow text-[9px] tracking-[0.24em] text-rambla-cream opacity-0" />
            </div>
            <div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-100 h-1.5 w-1.5 rounded-full bg-rambla-gold opacity-0"
            />
        </>
    );
}
