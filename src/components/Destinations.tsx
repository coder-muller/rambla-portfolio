import { useRef } from 'react';
import { gsap, useGSAP, DESKTOP, MOTION_OK } from '../lib/gsap';
import { destinations } from '../lib/content';
import { unsplash, unsplashSrcSet } from '../lib/media';
import { requestDestination } from '../lib/events';
import Img from './ui/Img';
import Arrow from './ui/Arrow';
import LogoSymbol from './ui/LogoSymbol';

const pad = (value: number) => String(value).padStart(2, '0');

export default function Destinations() {
    const root = useRef<HTMLElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;
            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                gsap.from(q('[data-dest-heading] [data-line]'), {
                    yPercent: 115,
                    stagger: 0.1,
                    duration: 1.5,
                    scrollTrigger: { trigger: section, start: 'top 75%' },
                });
            });

            // Desktop: a seção fica fixa e os cards correm na horizontal.
            mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
                const track = q('[data-dest-track]')[0];
                const progress = q('[data-dest-progress]')[0];
                const total = destinations.length;
                const distance = () => track.scrollWidth - window.innerWidth;

                const scroller = gsap.to(track, {
                    x: () => -distance(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        start: 'top top',
                        end: () => `+=${distance()}`,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            gsap.set(progress, { scaleX: self.progress });
                            if (counterRef.current) {
                                counterRef.current.textContent = pad(Math.min(total, Math.floor(self.progress * total) + 1));
                            }
                        },
                    },
                });

                q('[data-dest-card]').forEach((card) => {
                    const image = card.querySelector('[data-dest-img]');
                    if (image) {
                        gsap.fromTo(
                            image,
                            { xPercent: -9 },
                            {
                                xPercent: 9,
                                ease: 'none',
                                scrollTrigger: { trigger: card, containerAnimation: scroller, start: 'left right', end: 'right left', scrub: true },
                            },
                        );
                    }
                    gsap.from(card.querySelectorAll('[data-dest-meta]'), {
                        opacity: 0,
                        y: 30,
                        stagger: 0.08,
                        duration: 1.2,
                        scrollTrigger: { trigger: card, containerAnimation: scroller, start: 'left 88%' },
                    });
                });

                gsap.fromTo(
                    q('[data-dest-symbol]'),
                    { rotate: -20 },
                    {
                        rotate: 20,
                        ease: 'none',
                        scrollTrigger: { trigger: q('[data-dest-cta]')[0], containerAnimation: scroller, start: 'left right', end: 'right left', scrub: true },
                    },
                );
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        // A âncora fica num wrapper: a seção fixada recebe transform do GSAP e mudaria de posição.
        <div id="destinos">
            <section ref={root} className="relative overflow-hidden bg-rambla-sand py-24 md:py-32 lg:flex lg:h-svh lg:flex-col lg:py-0">
                <div className="flex flex-col gap-8 px-6 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:pt-24">
                    <div data-dest-heading>
                        <p className="eyebrow mb-6 text-rambla-gold">(02) — Destinos</p>
                        <h2 className="font-serif text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[0.98] text-rambla-navy">
                            <span className="line-mask">
                                <span data-line className="block">
                                    Lugares que
                                </span>
                            </span>
                            <span className="line-mask">
                                <span data-line className="block italic text-rambla-gold">
                                    colecionamos.
                                </span>
                            </span>
                        </h2>
                    </div>
                    <div className="hidden items-center gap-6 lg:flex">
                        <span className="font-serif text-2xl text-rambla-navy">
                            <span ref={counterRef}>01</span>
                            <span className="text-rambla-navy/30"> / {pad(destinations.length)}</span>
                        </span>
                        <span className="relative block h-px w-40 overflow-hidden bg-rambla-navy/15">
                            <span data-dest-progress className="absolute inset-0 block origin-left bg-rambla-gold" style={{ transform: 'scaleX(0)' }} />
                        </span>
                    </div>
                </div>

                <div className="mt-14 flex-1 lg:mt-0 lg:flex lg:items-center">
                    <ul
                        data-dest-track
                        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:px-12 lg:gap-[5vw] lg:motion-safe:snap-none lg:motion-safe:overflow-visible lg:pb-0 lg:pl-12 lg:pr-[10vw] [&::-webkit-scrollbar]:hidden"
                    >
                        <li className="hidden shrink-0 flex-col justify-end lg:flex lg:w-[26vw]">
                            <p className="font-serif text-[clamp(1.6rem,2.2vw,2.3rem)] leading-snug text-rambla-navy/80">
                                Do Mediterrâneo aos Andes, cada roteiro leva a assinatura Rambla: <em className="text-rambla-gold">sob medida</em>, do
                                primeiro sonho ao último detalhe.
                            </p>
                            <p className="eyebrow mt-8 flex items-center gap-3 text-[9px] text-rambla-navy/50">
                                <span className="h-px w-10 bg-rambla-navy/30" />
                                Role para viajar
                            </p>
                        </li>

                        {destinations.map((destination, index) => (
                            <li
                                key={destination.name}
                                data-dest-card
                                className={`w-[76vw] shrink-0 snap-center sm:w-[46vw] lg:w-[clamp(260px,25vw,380px)] ${index % 2 === 1 ? 'lg:translate-y-10' : 'lg:-translate-y-4'}`}
                            >
                                <a
                                    href="#contato"
                                    onClick={() => requestDestination(destination.name)}
                                    aria-label={`Planejar uma viagem para ${destination.name}, ${destination.region}`}
                                    className="group/card block"
                                >
                                    <div
                                        data-cursor="Planejar"
                                        className="relative aspect-3/4 overflow-hidden rounded-t-full bg-rambla-navy/10 lg:aspect-auto lg:h-[clamp(260px,42vh,470px)]"
                                    >
                                        <div data-dest-img className="absolute inset-y-0 -left-[12%] w-[124%]">
                                            <Img
                                                src={unsplash(destination.image, 960)}
                                                srcSet={unsplashSrcSet(destination.image, [480, 720, 960, 1280])}
                                                sizes="(min-width: 1024px) 30vw, 80vw"
                                                alt={`${destination.name}, ${destination.region}`}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out-expo group-hover/card:scale-105"
                                            />
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-rambla-dark/55 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover/card:opacity-100" />
                                        <span className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-rambla-cream opacity-0 transition-all duration-700 ease-out-expo group-hover/card:-translate-y-1 group-hover/card:opacity-100">
                                            <span className="eyebrow text-[9px]">Planejar viagem</span>
                                            <Arrow className="h-3 w-3" />
                                        </span>
                                    </div>

                                    <div className="mt-6 flex items-start justify-between gap-4">
                                        <div>
                                            <p data-dest-meta className="eyebrow text-[9px] text-rambla-gold">
                                                {destination.region}
                                            </p>
                                            <h3
                                                data-dest-meta
                                                className="mt-2 font-serif text-3xl leading-none text-rambla-navy transition-colors duration-500 group-hover/card:text-rambla-gold md:text-4xl"
                                            >
                                                {destination.name}
                                            </h3>
                                        </div>
                                        <span data-dest-meta className="pt-1 font-sans text-[10px] tracking-[0.2em] text-rambla-navy/35">
                                            {pad(index + 1)}
                                        </span>
                                    </div>
                                    <p data-dest-meta className="mt-3 line-clamp-2 max-w-[32ch] text-sm font-light leading-relaxed text-rambla-navy/60">
                                        {destination.description}
                                    </p>
                                </a>
                            </li>
                        ))}

                        <li data-dest-cta className="w-[76vw] shrink-0 snap-center sm:w-[46vw] lg:w-[clamp(260px,25vw,380px)]">
                            <a
                                href="#contato"
                                className="group/card relative flex aspect-3/4 flex-col items-center justify-center overflow-hidden rounded-t-full bg-rambla-navy px-10 text-center text-rambla-cream lg:aspect-auto lg:h-[clamp(260px,42vh,470px)]"
                            >
                                <LogoSymbol data-dest-symbol tone="light" className="mb-8 h-16 w-16 transition-transform duration-700 group-hover/card:scale-110" />
                                <p className="font-serif text-3xl leading-tight md:text-4xl">
                                    Seu destino não está aqui?
                                </p>
                                <p className="mt-4 text-sm font-light text-rambla-cream/70">Criamos roteiros para qualquer lugar do mundo.</p>
                                <span className="eyebrow mt-8 flex items-center gap-3 text-[9px] text-rambla-gold-soft">
                                    Fale com a gente
                                    <Arrow className="h-3 w-3 transition-transform duration-500 group-hover/card:rotate-45" />
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
