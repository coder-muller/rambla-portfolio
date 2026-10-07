import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '../lib/gsap';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { useIntro } from '../lib/intro';
import { contact, navLinks } from '../lib/content';
import Magnetic from './ui/Magnetic';
import RollText from './ui/RollText';
import Arrow from './ui/Arrow';

const MENU_CLOSED = 'circle(0% at calc(100% - 48px) 44px)';
const MENU_OPEN = 'circle(150% at calc(100% - 48px) 44px)';

export default function Navbar() {
    const { played, revealed } = useIntro();
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const entrance = useRef<gsap.core.Timeline | null>(null);
    const menuTl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            const nav = navRef.current;
            if (!nav) return;
            const q = gsap.utils.selector(nav);

            // Fundo translúcido depois de rolar um pouco.
            ScrollTrigger.create({
                start: 60,
                end: 'max',
                onToggle: (self) => nav.setAttribute('data-scrolled', String(self.isActive)),
            });

            // Barra de progresso de leitura.
            gsap.fromTo(
                q('[data-nav-progress]'),
                { scaleX: 0 },
                { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3, invalidateOnRefresh: true } },
            );

            // Esconde ao descer, volta ao subir.
            const bar = barRef.current;
            const toggle = gsap
                .from(bar, { yPercent: -110, paused: true, duration: 0.6, ease: 'power3.out' })
                .progress(1);
            ScrollTrigger.create({
                start: 0,
                end: 'max',
                onUpdate: (self) => {
                    if (self.scroll() < 160 || self.direction === -1) toggle.play();
                    else toggle.reverse();
                },
            });

            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                entrance.current = gsap
                    .timeline({ paused: true })
                    .from(q('[data-nav-item]'), { y: -40, opacity: 0, duration: 1.2, stagger: 0.07 });
                if (!played) entrance.current.play();

                const menu = menuRef.current;
                if (menu) {
                    menuTl.current = gsap
                        .timeline({ paused: true })
                        .set(menu, { visibility: 'visible' })
                        .fromTo(
                            menu,
                            { clipPath: MENU_CLOSED },
                            { clipPath: MENU_OPEN, duration: 1, ease: 'expo.inOut' },
                        )
                        .from(menu.querySelectorAll('[data-menu-item]'), { yPercent: 110, duration: 1, stagger: 0.06 }, 0.35)
                        .from(menu.querySelectorAll('[data-menu-fade]'), { opacity: 0, y: 20, duration: 0.8 }, 0.6);
                }
            });

            return () => mm.revert();
        },
        { scope: navRef },
    );

    useEffect(() => {
        if (played && revealed) entrance.current?.play();
    }, [played, revealed]);

    const wasOpen = useRef(false);
    useEffect(() => {
        const tl = menuTl.current;
        const menu = menuRef.current;
        if (menuOpen) {
            lockScroll();
            if (tl) tl.timeScale(1).play();
            else if (menu) Object.assign(menu.style, { visibility: 'visible', clipPath: 'none' });
        } else if (wasOpen.current) {
            unlockScroll();
            if (tl) tl.timeScale(1.6).reverse();
            else if (menu) Object.assign(menu.style, { visibility: 'hidden', clipPath: MENU_CLOSED });
        }
        wasOpen.current = menuOpen;
    }, [menuOpen]);

    useEffect(() => {
        if (!menuOpen) return;
        const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [menuOpen]);

    return (
        <header ref={navRef} className="group/nav">
            <div ref={barRef} className="fixed inset-x-0 top-0 z-50">
                <nav
                    aria-label="Principal"
                    className={`relative transition-[background-color,border-color,backdrop-filter] duration-700 border-b ${
                        menuOpen
                            ? 'border-transparent bg-transparent'
                            : 'border-transparent group-data-[scrolled=true]/nav:border-rambla-navy/8 group-data-[scrolled=true]/nav:bg-rambla-cream/80 group-data-[scrolled=true]/nav:backdrop-blur-xl'
                    }`}
                >
                    <div className="mx-auto flex max-w-360 items-center justify-between px-6 py-4 md:px-12 md:py-5">
                        <a href="#inicio" data-nav-item aria-label="Rambla Viagens, voltar ao início" className="relative z-10 block">
                            <img
                                src="/rambla-horizontal.png"
                                alt="Rambla Viagens"
                                className={`h-10 w-auto object-contain transition-[filter] duration-500 md:h-12 ${menuOpen ? 'brightness-0 invert' : ''}`}
                            />
                        </a>

                        <ul className="hidden items-center gap-9 lg:flex">
                            {navLinks.map((link) => (
                                <li key={link.href} data-nav-item>
                                    <a href={link.href} className="group/roll eyebrow block text-[10px] text-rambla-navy transition-colors hover:text-rambla-gold">
                                        <RollText>{link.label}</RollText>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="hidden lg:block" data-nav-item>
                            <Magnetic strength={0.25}>
                                <a
                                    href="#contato"
                                    className="group/roll group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-rambla-navy/20 px-6 py-3 text-rambla-navy transition-colors duration-500 hover:border-rambla-navy hover:text-rambla-cream"
                                >
                                    <span className="absolute inset-0 translate-y-full rounded-full bg-rambla-navy transition-transform duration-700 ease-out-expo group-hover/btn:translate-y-0" />
                                    <span className="eyebrow relative text-[10px]">
                                        <RollText>Planejar viagem</RollText>
                                    </span>
                                    <Arrow className="relative h-3 w-3 transition-transform duration-500 group-hover/btn:rotate-45" />
                                </a>
                            </Magnetic>
                        </div>

                        <button
                            type="button"
                            data-nav-item
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-current/15 lg:hidden"
                        >
                            <span className="relative block h-2.5 w-5">
                                <span
                                    className={`absolute left-0 h-px w-full transition-all duration-500 ease-out-expo ${
                                        menuOpen ? 'top-1/2 rotate-45 bg-rambla-cream' : 'top-0 bg-rambla-navy'
                                    }`}
                                />
                                <span
                                    className={`absolute left-0 h-px transition-all duration-500 ease-out-expo ${
                                        menuOpen ? 'top-1/2 w-full -rotate-45 bg-rambla-cream' : 'top-full w-3/5 bg-rambla-navy'
                                    }`}
                                />
                            </span>
                        </button>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                        <div data-nav-progress className="h-full w-full origin-left bg-rambla-gold/70" style={{ transform: 'scaleX(0)' }} />
                    </div>
                </nav>
            </div>

            <div
                ref={menuRef}
                id="mobile-menu"
                className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-rambla-navy px-6 pb-10 pt-32 text-rambla-cream lg:hidden"
                style={{ clipPath: MENU_CLOSED }}
                aria-hidden={!menuOpen}
            >
                <ul className="space-y-3">
                    {navLinks.map((link, index) => (
                        <li key={link.href} className="line-mask">
                            <a
                                href={link.href}
                                data-menu-item
                                onClick={() => setMenuOpen(false)}
                                tabIndex={menuOpen ? 0 : -1}
                                className="flex items-baseline gap-4 font-serif text-[2.6rem] leading-tight"
                            >
                                <span className="font-sans text-[10px] tracking-[0.2em] text-rambla-gold-soft">0{index + 1}</span>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div data-menu-fade className="space-y-3 border-t border-rambla-cream/15 pt-8 text-sm font-light text-rambla-cream/70">
                    <a href={`mailto:${contact.email}`} tabIndex={menuOpen ? 0 : -1} className="block">
                        {contact.email}
                    </a>
                    <a href={contact.phoneHref} tabIndex={menuOpen ? 0 : -1} className="block">
                        {contact.phoneLabel}
                    </a>
                </div>
            </div>
        </header>
    );
}
