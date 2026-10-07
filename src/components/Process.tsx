import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';
import { processSteps } from '../lib/content';
import RollText from './ui/RollText';
import Arrow from './ui/Arrow';
import LogoSymbol from './ui/LogoSymbol';

export default function Process() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;
            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                gsap.from(q('[data-process-heading] [data-line]'), {
                    yPercent: 115,
                    stagger: 0.1,
                    duration: 1.5,
                    scrollTrigger: { trigger: section, start: 'top 75%' },
                });
                gsap.from(q('[data-process-fade]'), {
                    opacity: 0,
                    y: 24,
                    stagger: 0.12,
                    duration: 1.3,
                    scrollTrigger: { trigger: section, start: 'top 65%' },
                });

                const steps = q('[data-step-list]')[0];
                gsap.fromTo(
                    q('[data-process-progress]'),
                    { scaleY: 0 },
                    { scaleY: 1, ease: 'none', scrollTrigger: { trigger: steps, start: 'top 60%', end: 'bottom 60%', scrub: true } },
                );

                gsap.fromTo(
                    q('[data-process-symbol]'),
                    { rotate: -8, yPercent: 10 },
                    { rotate: 8, yPercent: -10, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
                );

                q('[data-step]').forEach((step) => {
                    const dot = step.querySelector('[data-step-dot]');
                    gsap.from(step.querySelectorAll('[data-step-text]'), {
                        opacity: 0,
                        y: 30,
                        stagger: 0.1,
                        duration: 1.3,
                        scrollTrigger: { trigger: step, start: 'top 80%' },
                    });
                    gsap.to(dot, {
                        backgroundColor: '#b1803c',
                        borderColor: '#b1803c',
                        color: '#f9f9f8',
                        scale: 1.08,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: step, start: 'top 60%', toggleActions: 'play none none reverse' },
                    });
                });
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        <section ref={root} id="processo" className="relative overflow-hidden bg-rambla-sand px-6 py-28 md:px-12 md:py-44">
            <LogoSymbol
                data-process-symbol
                className="pointer-events-none absolute -left-[12%] bottom-[-8%] w-[60vw] max-w-[640px] opacity-[0.04] lg:-left-[6%]"
            />

            <div className="relative mx-auto grid max-w-360 grid-cols-1 gap-16 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-36">
                        <div data-process-heading>
                            <p className="eyebrow mb-6 text-rambla-gold">(04) — Como funciona</p>
                            <h2 className="font-serif text-[clamp(2.6rem,4.8vw,5rem)] leading-[0.98] text-rambla-navy">
                                <span className="line-mask">
                                    <span data-line className="block">
                                        Da primeira conversa
                                    </span>
                                </span>
                                <span className="line-mask">
                                    <span data-line className="block italic text-rambla-gold">
                                        ao embarque.
                                    </span>
                                </span>
                            </h2>
                        </div>
                        <p data-process-fade className="mt-8 max-w-sm text-base font-light leading-relaxed text-rambla-navy/70 md:text-lg">
                            Um processo leve e transparente, pensado para que você só precise escolher para onde quer ir.
                        </p>
                        <a
                            data-process-fade
                            href="#contato"
                            className="group/roll eyebrow mt-10 inline-flex items-center gap-4 text-[10px] text-rambla-navy"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rambla-navy/20 transition-colors duration-500 group-hover/roll:border-rambla-gold group-hover/roll:bg-rambla-gold group-hover/roll:text-rambla-cream">
                                <Arrow className="h-3 w-3" />
                            </span>
                            <RollText>Quero começar</RollText>
                        </a>
                    </div>
                </div>

                <ol data-step-list className="relative lg:col-span-6 lg:col-start-7">
                    <span className="absolute bottom-0 left-[27px] top-0 w-px bg-rambla-navy/12" aria-hidden="true">
                        <span data-process-progress className="absolute inset-0 block origin-top bg-rambla-gold" />
                    </span>

                    {processSteps.map((step, index) => (
                        <li key={step.title} data-step className="relative pb-20 pl-20 last:pb-0 md:pb-28 md:pl-28">
                            <span
                                data-step-dot
                                className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-rambla-navy/15 bg-rambla-sand font-serif text-xl text-rambla-navy"
                            >
                                0{index + 1}
                            </span>
                            <h3 data-step-text className="pt-2 font-serif text-4xl text-rambla-navy md:text-5xl">
                                {step.title}
                            </h3>
                            <p data-step-text className="mt-4 max-w-md text-base font-light leading-relaxed text-rambla-navy/65">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
