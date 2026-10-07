import { Fragment, useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '../lib/gsap';
import { marqueeDestinations } from '../lib/content';
import PalmGlyph from './ui/PalmGlyph';

const BASE_SPEED = 2.2; // % da faixa por segundo

/** Faixa infinita de destinos. Acelera e muda de direção conforme o scroll. */
export default function Marquee() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = root.current;
            const track = section?.querySelector<HTMLElement>('[data-marquee-track]');
            if (!section || !track) return;

            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const wrap = gsap.utils.wrap(-50, 0);
                const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' });
                let x = 0;
                let boost = 0;
                let skew = 0;
                let direction = 1;

                const tick = (_time: number, delta: number) => {
                    x = wrap(x - (BASE_SPEED + boost) * direction * (delta / 1000));
                    gsap.set(track, { xPercent: x });
                    boost *= 0.94;
                    skew *= 0.88;
                    skewTo(skew);
                };

                const trigger = ScrollTrigger.create({
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        direction = self.direction;
                        boost = Math.min(Math.abs(velocity) / 90, 28);
                        skew = gsap.utils.clamp(-7, 7, velocity / -260);
                    },
                });

                if (trigger.isActive) gsap.ticker.add(tick);
                return () => gsap.ticker.remove(tick);
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    const items = [...marqueeDestinations, ...marqueeDestinations];

    return (
        <section ref={root} aria-label="Alguns dos destinos que planejamos" className="relative overflow-hidden border-y border-rambla-navy/8 py-8 md:py-12">
            <ul className="sr-only">
                {marqueeDestinations.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
            <div data-marquee-track aria-hidden="true" className="flex w-max items-center will-change-transform">
                {items.map((name, index) => (
                    <Fragment key={`${name}-${index}`}>
                        <span
                            className={`whitespace-nowrap px-6 font-serif text-[clamp(2.8rem,6.5vw,6.5rem)] italic leading-none md:px-10 ${
                                index % 2 === 0 ? 'text-rambla-navy' : 'text-outline text-rambla-navy/60'
                            }`}
                        >
                            {name}
                        </span>
                        <PalmGlyph className="h-7 w-7 shrink-0 md:h-10 md:w-10" />
                    </Fragment>
                ))}
            </div>
        </section>
    );
}
