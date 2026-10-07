import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';
import { images, pillars } from '../lib/content';
import { unsplash } from '../lib/media';
import Img from './ui/Img';

// Palavras marcadas com * ganham destaque em itálico dourado.
const STATEMENT =
    'Viajar é mais do que visitar lugares, é *colecionar *momentos que ficam para sempre. Transformamos o planejamento complexo em uma experiência fluida, elegante e prazerosa.';

export default function Manifesto() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;
            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                gsap.fromTo(
                    q('[data-word]'),
                    { opacity: 0.12 },
                    {
                        opacity: 1,
                        stagger: 0.08,
                        ease: 'none',
                        scrollTrigger: { trigger: q('[data-statement]')[0], start: 'top 82%', end: 'bottom 55%', scrub: true },
                    },
                );

                gsap.from(q('[data-manifesto-label]'), {
                    opacity: 0,
                    y: 20,
                    scrollTrigger: { trigger: section, start: 'top 80%' },
                });

                const frame = q('[data-manifesto-frame]')[0];
                gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 85%' } })
                    .from(frame, { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)', duration: 1.8, ease: 'expo.inOut' })
                    .from(q('[data-manifesto-img]'), { scale: 1.5, duration: 2.4 }, 0);

                gsap.fromTo(
                    q('[data-manifesto-parallax]'),
                    { yPercent: -8 },
                    { yPercent: 8, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
                );

                gsap.fromTo(
                    q('[data-manifesto-quote]'),
                    { yPercent: 25 },
                    { yPercent: -15, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
                );

                gsap.from(q('[data-manifesto-copy] > *'), {
                    opacity: 0,
                    y: 30,
                    stagger: 0.12,
                    duration: 1.4,
                    scrollTrigger: { trigger: q('[data-manifesto-copy]')[0], start: 'top 80%' },
                });

                q('[data-pillar]').forEach((pillar) => {
                    gsap.timeline({ scrollTrigger: { trigger: pillar, start: 'top 88%' } })
                        .from(pillar.querySelector('[data-pillar-line]'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'expo.inOut' })
                        .from(pillar.querySelectorAll('[data-pillar-text]'), { opacity: 0, y: 18, stagger: 0.08, duration: 1.2 }, 0.3);
                });
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    const words = STATEMENT.split(' ');

    return (
        <section ref={root} id="experiencias" className="relative px-6 py-28 md:px-12 md:py-44">
            <div className="mx-auto max-w-360">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <p data-manifesto-label className="eyebrow pt-3 text-rambla-gold lg:col-span-3">
                        (01) — Nossa filosofia
                    </p>
                    <p
                        data-statement
                        className="font-serif text-[clamp(2.1rem,4.3vw,4.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-rambla-navy lg:col-span-9"
                    >
                        {words.map((word, index) => {
                            const highlight = word.startsWith('*');
                            const text = highlight ? word.slice(1) : word;
                            return (
                                <span key={index}>
                                    <span data-word className={highlight ? 'italic text-rambla-gold' : undefined}>
                                        {text}
                                    </span>{' '}
                                </span>
                            );
                        })}
                    </p>
                </div>

                <div className="mt-24 grid grid-cols-1 items-end gap-20 md:mt-40 lg:grid-cols-12 lg:gap-8">
                    <div className="relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:mx-0">
                        <div
                            data-manifesto-frame
                            className="relative aspect-4/5 overflow-hidden rounded-t-full bg-rambla-sand shadow-[0_50px_90px_-45px_rgba(29,50,75,0.5)]"
                        >
                            <div data-manifesto-parallax className="absolute -inset-y-[10%] inset-x-0">
                                <Img
                                    data-manifesto-img
                                    src={unsplash(images.manifesto, 1400)}
                                    alt="Vista de uma costa ensolarada"
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <figure
                            data-manifesto-quote
                            className="absolute -bottom-12 right-0 w-[78%] max-w-[300px] bg-rambla-navy p-7 text-rambla-cream shadow-2xl sm:-right-6 md:p-9 lg:-right-16"
                        >
                            <blockquote className="font-serif text-2xl italic leading-snug md:text-[1.7rem]">
                                “Descobrir é a verdadeira viagem.”
                            </blockquote>
                            <span className="mt-5 block h-px w-10 bg-rambla-gold" />
                        </figure>
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <div data-manifesto-copy className="space-y-6 text-base font-light leading-relaxed text-rambla-navy/70 md:text-lg">
                            <h2 className="font-serif text-4xl font-normal leading-tight text-rambla-navy md:text-5xl">
                                Elegância em cada <em className="text-rambla-gold">detalhe</em>.
                            </h2>
                            <p>
                                Na Rambla Viagens, acreditamos que viajar é colecionar momentos inesquecíveis. Nossa expertise transforma o
                                planejamento complexo em uma experiência fluida e prazerosa.
                            </p>
                            <p>
                                Cuidamos de tudo, do momento em que você sai de casa até o seu retorno, seja para uma escapada nacional ou uma
                                exploração internacional imersiva.
                            </p>
                        </div>

                        <ul className="mt-14 space-y-8">
                            {pillars.map((pillar, index) => (
                                <li key={pillar.title} data-pillar className="relative pt-6">
                                    <span data-pillar-line className="absolute left-0 top-0 h-px w-full bg-rambla-navy/12" />
                                    <div className="flex items-baseline gap-6">
                                        <span data-pillar-text className="font-sans text-[10px] tracking-[0.2em] text-rambla-gold">
                                            0{index + 1}
                                        </span>
                                        <div>
                                            <h3 data-pillar-text className="font-serif text-2xl text-rambla-navy">
                                                {pillar.title}
                                            </h3>
                                            <p data-pillar-text className="mt-1 text-sm font-light text-rambla-navy/60">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
