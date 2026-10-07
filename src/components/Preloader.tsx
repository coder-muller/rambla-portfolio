import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { markIntroSeen } from '../lib/intro';
import { images } from '../lib/content';
import { unsplash } from '../lib/media';
import { SYMBOL_ARCH_INNER, SYMBOL_PALM_ORIGIN, SYMBOL_VIEWBOX } from '../lib/symbol';
import LogoSymbol from './ui/LogoSymbol';
import Img from './ui/Img';

type PreloaderProps = {
    onReveal: () => void;
    onComplete: () => void;
};

const WORD = 'Rambla Viagens';
const [VIEW_X, VIEW_Y, VIEW_W] = SYMBOL_VIEWBOX.split(' ').map(Number);

/**
 * Abertura: o arco do logo se desenha, a palmeira floresce, as ondas chegam e a janela do
 * arco se abre numa paisagem que "voa" até a moldura do Hero.
 */
export default function Preloader({ onReveal, onComplete }: PreloaderProps) {
    const root = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const element = root.current;
            if (!element) return;

            const q = gsap.utils.selector(element);
            const symbol = element.querySelector<SVGSVGElement>('[data-pl-symbol]');
            const photo = element.querySelector<HTMLDivElement>('[data-pl-photo]');
            if (!symbol || !photo) return;

            if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
            lockScroll();

            const archRect = () => {
                const rect = symbol.getBoundingClientRect();
                const scale = rect.width / VIEW_W;
                return {
                    left: rect.left + (SYMBOL_ARCH_INNER.left - VIEW_X) * scale,
                    top: rect.top + (SYMBOL_ARCH_INNER.top - VIEW_Y) * scale,
                    width: (SYMBOL_ARCH_INNER.right - SYMBOL_ARCH_INNER.left) * scale,
                    height: (SYMBOL_ARCH_INNER.bottom - SYMBOL_ARCH_INNER.top) * scale,
                };
            };

            const heroFrame = () => document.querySelector<HTMLElement>('[data-hero-frame]');
            const landingRect = () => {
                const rect = heroFrame()?.getBoundingClientRect();
                const fitsViewport = rect && rect.width > 0 && rect.top < window.innerHeight;
                return fitsViewport ? rect : null;
            };

            gsap.set(photo, { ...archRect(), autoAlpha: 0 });

            const finish = () => {
                const frame = heroFrame();
                if (frame) {
                    frame.style.opacity = '1';
                    frame.style.visibility = 'inherit';
                }
                unlockScroll();
                markIntroSeen();
                ScrollTrigger.refresh();
                onComplete();
            };

            const tl = gsap.timeline({ delay: 0.2, onComplete: finish });

            tl.fromTo(
                q('[data-symbol="ring-draw"]'),
                { strokeDashoffset: 1 },
                { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
            )
                .from(
                    q('[data-symbol="leaf"]'),
                    { scale: 0, svgOrigin: SYMBOL_PALM_ORIGIN, duration: 1.1, ease: 'back.out(1.5)', stagger: 0.06 },
                    0.65,
                )
                .from(q('[data-symbol="drop"]'), { y: -110, opacity: 0, duration: 1, ease: 'bounce.out' }, 1.05)
                .from(
                    q('[data-symbol="wave"]'),
                    { x: (index: number) => (index === 0 ? -180 : 180), opacity: 0, duration: 1.3, stagger: 0.1 },
                    0.9,
                )
                .from(q('[data-pl-char]'), { yPercent: 115, duration: 1.1, stagger: 0.03 }, 0.85)
                .addLabel('window', 2.45)
                .to(
                    q('[data-symbol="palm"], [data-symbol="waves"]'),
                    { opacity: 0, duration: 0.45, ease: 'power2.in' },
                    'window',
                )
                .to(q('[data-pl-char]'), { yPercent: -115, duration: 0.6, stagger: 0.015, ease: 'power3.in' }, 'window')
                .to(photo, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, 'window+=0.25')
                .fromTo(q('[data-pl-photo] img, [data-pl-photo] [role="img"]'), { scale: 1.45 }, { scale: 1.15, duration: 1.8 }, 'window+=0.25')
                .addLabel('land', 'window+=1.05')
                .add(onReveal, 'land')
                .to(q('[data-symbol="ring"]'), { opacity: 0, duration: 0.35, ease: 'power2.out' }, 'land')
                .to(q('[data-pl-panel]'), { opacity: 0, duration: 1, ease: 'power2.inOut' }, 'land+=0.15')
                .to(
                    photo,
                    {
                        left: () => landingRect()?.left ?? archRect().left,
                        top: () => landingRect()?.top ?? archRect().top,
                        width: () => landingRect()?.width ?? archRect().width,
                        height: () => landingRect()?.height ?? archRect().height,
                        opacity: () => (landingRect() ? 1 : 0),
                        duration: 1.35,
                        ease: 'expo.inOut',
                    },
                    'land',
                )
                .add(() => {
                    const frame = heroFrame();
                    if (frame) {
                        frame.style.opacity = '1';
                        frame.style.visibility = 'inherit';
                    }
                })
                .to(photo, { autoAlpha: 0, duration: 0.3, ease: 'none' });

            return () => unlockScroll();
        },
        { scope: root },
    );

    return (
        <div ref={root} aria-hidden="true" className="fixed inset-0 z-80">
            <div data-pl-panel className="absolute inset-0 bg-rambla-cream" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
                <LogoSymbol data-pl-symbol drawable className="w-[clamp(150px,17vw,230px)] overflow-visible" />
                <p className="eyebrow flex overflow-hidden text-rambla-navy/70">
                    {Array.from(WORD).map((char, index) => (
                        <span key={index} data-pl-char className="inline-block">
                            {char === ' ' ? '  ' : char}
                        </span>
                    ))}
                </p>
            </div>

            <div data-pl-photo className="invisible fixed overflow-hidden rounded-t-full bg-rambla-sand">
                <Img src={unsplash(images.hero, 1400)} alt="" className="h-full w-full object-cover" />
            </div>
        </div>
    );
}
