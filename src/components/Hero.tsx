import { useEffect, useId, useRef } from 'react';
import { gsap, useGSAP, FINE_POINTER, MOTION_OK } from '../lib/gsap';
import { useIntro } from '../lib/intro';
import { heroPlace, images } from '../lib/content';
import { unsplash } from '../lib/media';
import Img from './ui/Img';
import Magnetic from './ui/Magnetic';
import RollText from './ui/RollText';
import Arrow from './ui/Arrow';
import PalmGlyph from './ui/PalmGlyph';
import Stamp from './ui/Stamp';

const TITLE_LINES = ['O mundo em', 'sua forma mais'];

// Arcos concêntricos do fundo, ecoando a janela do logo.
const ARCHES = [170, 265, 360, 455, 550].map((half) => {
    const sides = half * 0.95;
    return `M${550 - half} 1100V${1100 - sides}A${half} ${half} 0 0 1 ${550 + half} ${1100 - sides}V1100`;
});

function RotatingBadge() {
    const pathId = `badge-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    return (
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-rambla-cream/85 shadow-[0_20px_50px_-25px_rgba(29,50,75,0.45)] backdrop-blur-md md:h-32 md:w-32">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
                <defs>
                    <path id={pathId} d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
                </defs>
                <text className="fill-rambla-navy font-sans uppercase" style={{ fontSize: 7.6, letterSpacing: '0.3em' }}>
                    <textPath href={`#${pathId}`} textLength="282" lengthAdjust="spacing">
                        Roteiros sob medida · Rambla Viagens ·
                    </textPath>
                </text>
            </svg>
            <PalmGlyph className="h-9 w-9" />
        </div>
    );
}

export default function Hero() {
    const { played, revealed } = useIntro();
    const root = useRef<HTMLElement>(null);
    const entrance = useRef<gsap.core.Timeline | null>(null);
    const revealedRef = useRef(revealed);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;
            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                if (played) gsap.set(q('[data-hero-frame]'), { autoAlpha: 0 });

                const tl = gsap.timeline({ paused: true, defaults: { duration: 1.6 } });
                tl.from(q('[data-hero-line]'), { yPercent: 118, rotate: 3, transformOrigin: '0% 100%', stagger: 0.11 }, 0)
                    .from(q('[data-hero-rule]'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'expo.inOut' }, 0.1)
                    .from(q('[data-hero-eyebrow]'), { opacity: 0, x: -16, duration: 1.2 }, 0.4)
                    .from(q('[data-hero-fade]'), { opacity: 0, y: 28, stagger: 0.12, duration: 1.4 }, 0.55)
                    .fromTo(
                        q('[data-hero-arches] path'),
                        { strokeDashoffset: 1 },
                        { strokeDashoffset: 0, duration: 2.6, stagger: 0.12, ease: 'power3.inOut' },
                        0,
                    )
                    .from(q('[data-hero-outline]'), { opacity: 0, scale: 0.92, duration: 1.8 }, 0.5)
                    // O selo cai girando sobre a moldura e o carimbo "bate" com um pequeno impacto.
                    .from(q('[data-hero-stamp]'), { y: -80, rotate: -26, scale: 1.3, opacity: 0, duration: 1.2, ease: 'back.out(1.3)' }, 0.75)
                    .from(
                        q('[data-stamp-postmark]'),
                        { scale: 1.9, opacity: 0, transformOrigin: '22% 50%', duration: 0.36, ease: 'power4.in' },
                        1.6,
                    )
                    .to(q('[data-hero-stamp]'), { scale: 0.94, duration: 0.09, yoyo: true, repeat: 1, ease: 'power2.out' }, 1.96)
                    .from(q('[data-hero-card]'), { opacity: 0, y: 40, duration: 1.4 }, 1)
                    .from(q('[data-hero-badge]'), { scale: 0, rotate: -120, duration: 1.6, ease: 'back.out(1.4)' }, 0.95)
                    .from(q('[data-hero-cue]'), { opacity: 0, y: 20, duration: 1.2 }, 1.2);

                if (!played) {
                    tl.from(
                        q('[data-hero-frame]'),
                        { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)', duration: 1.8, ease: 'expo.inOut' },
                        0.15,
                    ).from(q('[data-hero-img]'), { scale: 1.5, duration: 2.4 }, 0.15);
                }

                entrance.current = tl;
                if (revealedRef.current) tl.play();

                // Parallax de scroll: cada camada viaja numa velocidade.
                const scroll = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };
                gsap.to(q('[data-hero-copy]'), { yPercent: -22, opacity: 0.15, ease: 'none', scrollTrigger: scroll });
                gsap.to(q('[data-hero-visual]'), { yPercent: -10, ease: 'none', scrollTrigger: scroll });
                gsap.fromTo(q('[data-hero-img]'), { yPercent: 0 }, { yPercent: 14, ease: 'none', scrollTrigger: scroll });
                gsap.to(q('[data-hero-detail-wrap]'), { yPercent: -60, ease: 'none', scrollTrigger: scroll });
                gsap.to(q('[data-hero-badge-wrap]'), { rotate: 200, yPercent: -40, ease: 'none', scrollTrigger: scroll });
                gsap.to(q('[data-hero-arches]'), { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: scroll });
            });

            // Parallax de mouse em camadas (desktop).
            mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
                const layers = q('[data-depth]').map((layer) => ({
                    depth: Number(layer.getAttribute('data-depth')),
                    x: gsap.quickTo(layer, 'x', { duration: 1.4, ease: 'power3' }),
                    y: gsap.quickTo(layer, 'y', { duration: 1.4, ease: 'power3' }),
                }));

                const handleMove = (event: PointerEvent) => {
                    const nx = event.clientX / window.innerWidth - 0.5;
                    const ny = event.clientY / window.innerHeight - 0.5;
                    layers.forEach((layer) => {
                        layer.x(nx * 36 * layer.depth);
                        layer.y(ny * 28 * layer.depth);
                    });
                };

                section.addEventListener('pointermove', handleMove);
                return () => section.removeEventListener('pointermove', handleMove);
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    useEffect(() => {
        revealedRef.current = revealed;
        if (revealed) entrance.current?.play();
    }, [revealed]);

    return (
        <section
            ref={root}
            id="inicio"
            className="relative flex min-h-svh items-center overflow-hidden px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:pb-24"
        >
            {/* Fundo: arcos concêntricos + brilho dourado */}
            <svg
                data-hero-arches
                viewBox="0 0 1100 1100"
                preserveAspectRatio="xMidYMax meet"
                className="pointer-events-none absolute -right-[30%] bottom-0 h-[92%] w-auto opacity-70 sm:-right-[18%] lg:right-[-6%] lg:h-[105%]"
                aria-hidden="true"
            >
                {ARCHES.map((d) => (
                    <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1" pathLength={1} strokeDasharray="1" className="text-rambla-navy/10" />
                ))}
            </svg>
            <div className="pointer-events-none absolute right-[12%] top-[28%] h-72 w-72 rounded-full bg-rambla-gold/15 blur-[90px]" aria-hidden="true" />

            <div className="relative mx-auto grid w-full max-w-360 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
                <div data-hero-copy className="relative z-10 order-2 lg:order-1 lg:col-span-7">
                    <div className="mb-8 flex items-center gap-3 md:mb-10 md:gap-4">
                        <span data-hero-rule className="h-px w-8 bg-rambla-gold md:w-12" />
                        <p data-hero-eyebrow className="eyebrow whitespace-nowrap tracking-[0.22em] text-rambla-gold md:tracking-[0.32em]">
                            Agência de viagens sob medida
                        </p>
                    </div>

                    <h1
                        aria-label="O mundo em sua forma mais exclusiva."
                        className="font-serif text-[clamp(3.2rem,7.4vw,8.4rem)] font-normal leading-[0.94] tracking-[-0.015em] text-rambla-navy"
                    >
                        {TITLE_LINES.map((line) => (
                            <span key={line} aria-hidden="true" className="line-mask">
                                <span data-hero-line className="block">
                                    {line}
                                </span>
                            </span>
                        ))}
                        <span aria-hidden="true" className="line-mask">
                            <span data-hero-line className="flex items-center gap-[0.25em]">
                                <em className="font-light text-rambla-gold">exclusiva.</em>
                                <span className="hidden h-px flex-1 translate-y-[0.1em] bg-rambla-navy/15 md:block" />
                            </span>
                        </span>
                    </h1>

                    <p data-hero-fade className="mt-8 max-w-md text-base font-light leading-relaxed text-rambla-navy/70 md:mt-10 md:text-lg">
                        Desenhamos roteiros sob medida e curadoria de experiências para quem busca viajar com elegância, conforto e propósito.
                    </p>

                    <div data-hero-fade className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center md:mt-12 md:gap-8">
                        <Magnetic strength={0.22}>
                            <a
                                href="#contato"
                                className="group/roll group/btn relative inline-flex w-full items-center justify-between gap-6 overflow-hidden rounded-full bg-rambla-navy py-2 pl-8 pr-2 text-rambla-cream sm:w-auto"
                            >
                                <span className="absolute inset-0 translate-y-full rounded-full bg-rambla-gold transition-transform duration-700 ease-out-expo group-hover/btn:translate-y-0" />
                                <span className="eyebrow relative text-[10px]">
                                    <RollText>Começar planejamento</RollText>
                                </span>
                                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-rambla-cream/10 transition-colors duration-500 group-hover/btn:bg-rambla-navy">
                                    <Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-45" />
                                </span>
                            </a>
                        </Magnetic>
                        <a href="#destinos" className="group/roll eyebrow inline-flex items-center gap-4 text-[10px] text-rambla-navy">
                            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-rambla-navy/20 transition-colors duration-500 group-hover/roll:border-rambla-gold group-hover/roll:text-rambla-gold">
                                <Arrow className="h-3 w-3 rotate-135" />
                            </span>
                            <RollText>Descobrir destinos</RollText>
                        </a>
                    </div>
                </div>

                <div data-hero-visual className="relative order-1 lg:order-2 lg:col-span-5">
                    <div className="relative mx-auto w-[min(58vw,250px)] sm:w-[320px] lg:ml-auto lg:mr-4 lg:w-full lg:max-w-[440px]">
                        <div data-depth="0.35" className="absolute inset-0">
                            <div
                                data-hero-outline
                                className="h-full w-full translate-x-5 -translate-y-5 rounded-t-full border border-rambla-gold/45 md:translate-x-7 md:-translate-y-7"
                            />
                        </div>

                        <div data-depth="0.75" className="relative">
                            <div
                                data-hero-frame
                                data-cursor="Paris"
                                className="relative aspect-3/4 overflow-hidden rounded-t-full bg-rambla-sand shadow-[0_50px_90px_-40px_rgba(29,50,75,0.55)]"
                            >
                                <Img
                                    data-hero-img
                                    src={unsplash(images.hero, 1400)}
                                    alt="Ponte Alexandre III, em Paris, ao entardecer"
                                    fetchPriority="high"
                                    className="h-full w-full scale-[1.15] object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-rambla-navy/35 via-transparent to-transparent" />
                            </div>
                        </div>

                        <div data-depth="1.5" className="absolute -bottom-4 -left-6 w-[40%] sm:-left-12 lg:-bottom-10 lg:-left-16 lg:w-[36%]">
                            <div data-hero-detail-wrap>
                                <div className="-rotate-6 transition-transform duration-700 ease-out-expo hover:-translate-y-1.5 hover:-rotate-2">
                                    <div data-hero-stamp>
                                        <Stamp city={heroPlace.city} country={heroPlace.country} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div data-depth="1.1" className="absolute -left-6 top-[18%] hidden md:block lg:-left-24">
                            <div data-hero-card className="bg-white/80 px-6 py-5 shadow-[0_25px_50px_-20px_rgba(29,50,75,0.25)] backdrop-blur-md">
                                <p className="mb-2 font-serif text-2xl italic leading-none text-rambla-navy">Personalizado</p>
                                <p className="eyebrow text-[9px] text-rambla-gold">Do seu jeito</p>
                            </div>
                        </div>

                        <div data-depth="0.9" className="absolute -right-6 -top-8 md:-right-12">
                            <div data-hero-badge-wrap>
                                <div data-hero-badge>
                                    <RotatingBadge />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-hero-cue className="absolute bottom-8 left-6 right-6 hidden items-end justify-between md:left-12 md:right-12 md:flex">
                <a href="#experiencias" className="group/roll flex items-center gap-4">
                    <span className="relative block h-12 w-px overflow-hidden bg-rambla-navy/10">
                        <span className="absolute inset-0 block animate-scroll-cue bg-rambla-gold" />
                    </span>
                    <span className="eyebrow text-[9px] text-rambla-navy/50 transition-colors group-hover/roll:text-rambla-gold">
                        <RollText>Role para explorar</RollText>
                    </span>
                </a>
                <p className="eyebrow text-[9px] text-rambla-navy/40">Viagens nacionais & internacionais</p>
            </div>
        </section>
    );
}
