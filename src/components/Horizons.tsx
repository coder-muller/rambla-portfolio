import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';
import { images } from '../lib/content';
import { unsplash, unsplashSrcSet } from '../lib/media';
import Img from './ui/Img';
import Magnetic from './ui/Magnetic';
import RollText from './ui/RollText';
import Arrow from './ui/Arrow';

const FULL = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)';

function Words({ tone }: { tone: 'navy' | 'cream' }) {
    const color = tone === 'navy' ? 'text-rambla-navy' : 'text-rambla-cream';
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center font-serif ${color}`}>
            <span data-hz-word="left" className="block text-[clamp(3.6rem,11vw,12rem)] font-light leading-[0.85] tracking-[-0.02em]">
                Colecione
            </span>
            <span data-hz-word="right" className="block text-[clamp(3.6rem,11vw,12rem)] italic leading-[0.85] tracking-[-0.02em]">
                Horizontes
            </span>
        </div>
    );
}

/**
 * Uma janela em arco no centro da tela se abre até virar paisagem em tela cheia. O texto existe
 * em duas camadas (navy por fora, creme dentro da janela), então muda de cor ao cruzar a borda.
 */
export default function Horizons() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;
            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                const arch = () => {
                    const width = section.clientWidth;
                    const height = section.clientHeight;
                    const w = Math.min(width * (width < 768 ? 0.62 : 0.26), 400);
                    const h = Math.min(height * 0.66, w * 1.45);
                    const side = (width - w) / 2;
                    const top = (height - h) / 2;
                    return `inset(${top}px ${side}px ${top}px ${side}px round ${w / 2}px ${w / 2}px 0px 0px)`;
                };

                gsap.set(q('[data-hz-final]'), { autoAlpha: 0 });
                gsap.set(q('[data-hz-shade]'), { opacity: 0 });

                const tl = gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        start: 'top top',
                        end: '+=190%',
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    },
                });

                tl.fromTo(q('[data-hz-window]'), { clipPath: arch }, { clipPath: FULL, duration: 1, ease: 'power2.inOut' }, 0)
                    .fromTo(q('[data-hz-img]'), { scale: 1.45 }, { scale: 1, duration: 1.2, ease: 'power1.out' }, 0)
                    .to(q('[data-hz-word="left"]'), { xPercent: -28, duration: 1, ease: 'power1.in' }, 0)
                    .to(q('[data-hz-word="right"]'), { xPercent: 28, duration: 1, ease: 'power1.in' }, 0)
                    .to(q('[data-hz-words]'), { opacity: 0, duration: 0.35 }, 0.75)
                    .to(q('[data-hz-shade]'), { opacity: 1, duration: 0.4 }, 0.85)
                    .to(q('[data-hz-final]'), { autoAlpha: 1, duration: 0.2 }, 1.05)
                    .from(q('[data-hz-final-line]'), { yPercent: 115, stagger: 0.08, duration: 0.4, ease: 'power3.out' }, 1.05)
                    .from(q('[data-hz-final-fade]'), { opacity: 0, y: 30, stagger: 0.06, duration: 0.35, ease: 'power3.out' }, 1.2)
                    .to({}, { duration: 0.25 });
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        <section ref={root} aria-label="Colecione horizontes" className="relative h-svh overflow-hidden bg-rambla-cream">
            <div data-hz-words className="absolute inset-0 motion-reduce:hidden">
                <Words tone="navy" />
            </div>

            <div data-hz-window className="absolute inset-0 overflow-hidden" style={{ clipPath: FULL }}>
                <Img
                    data-hz-img
                    src={unsplash(images.horizons, 2000)}
                    srcSet={unsplashSrcSet(images.horizons)}
                    sizes="100vw"
                    alt="Paisagem ao entardecer"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-rambla-navy/25" />
                <div data-hz-shade className="absolute inset-0 bg-linear-to-t from-rambla-navy via-rambla-navy/60 to-rambla-navy/30" />
                <div data-hz-words className="absolute inset-0 motion-reduce:hidden">
                    <Words tone="cream" />
                </div>
            </div>

            <div data-hz-final className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-rambla-cream">
                <p data-hz-final-fade className="eyebrow mb-8 text-rambla-gold-soft">
                    Cada viagem, uma nova perspectiva
                </p>
                <h2 className="font-serif text-[clamp(3rem,8vw,8.5rem)] font-light leading-[0.9] tracking-[-0.02em]">
                    <span className="line-mask">
                        <span data-hz-final-line className="block">
                            Colecione
                        </span>
                    </span>
                    <span className="line-mask">
                        <span data-hz-final-line className="block italic text-rambla-gold-soft">
                            horizontes.
                        </span>
                    </span>
                </h2>
                <p data-hz-final-fade className="mt-8 max-w-md text-base font-light leading-relaxed text-rambla-cream/75 md:text-lg">
                    A sua próxima história começa com uma conversa. Conte para onde o coração aponta, e nós desenhamos o caminho.
                </p>
                <div data-hz-final-fade className="mt-10">
                    <Magnetic strength={0.25}>
                        <a
                            href="#contato"
                            className="group/roll group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-rambla-cream/30 py-2 pl-8 pr-2 text-rambla-cream transition-colors duration-500 hover:border-rambla-gold"
                        >
                            <span className="absolute inset-0 translate-y-full rounded-full bg-rambla-gold transition-transform duration-700 ease-out-expo group-hover/btn:translate-y-0" />
                            <span className="eyebrow relative text-[10px]">
                                <RollText>Planejar minha viagem</RollText>
                            </span>
                            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-rambla-cream text-rambla-navy">
                                <Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-45" />
                            </span>
                        </a>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}
