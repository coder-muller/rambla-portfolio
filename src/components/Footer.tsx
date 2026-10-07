import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';
import { scrollToTarget } from '../lib/scroll';
import { contact, navLinks } from '../lib/content';
import LogoSymbol from './ui/LogoSymbol';
import Magnetic from './ui/Magnetic';
import RollText from './ui/RollText';
import Arrow from './ui/Arrow';

const WORDMARK = 'Rambla';

export default function Footer() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const footer = root.current;
            if (!footer) return;
            const q = gsap.utils.selector(footer);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                gsap.from(q('[data-footer-char]'), {
                    yPercent: 105,
                    stagger: 0.06,
                    ease: 'none',
                    scrollTrigger: { trigger: q('[data-footer-word]')[0], start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
                });
                gsap.from(q('[data-footer-fade]'), {
                    opacity: 0,
                    y: 30,
                    stagger: 0.08,
                    duration: 1.3,
                    scrollTrigger: { trigger: footer, start: 'top 80%' },
                });
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        <footer ref={root} className="relative overflow-hidden bg-rambla-dark text-rambla-cream">
            <div className="mx-auto grid max-w-360 grid-cols-1 gap-14 px-6 pb-16 pt-24 md:grid-cols-12 md:px-12 md:pt-32">
                <div data-footer-fade className="md:col-span-5">
                    <LogoSymbol tone="light" title="Rambla Viagens" className="h-14 w-14" />
                    <p className="mt-8 max-w-sm font-serif text-3xl font-light leading-snug text-rambla-cream/90">
                        Viajar com <em className="text-rambla-gold-soft">elegância</em>, conforto e propósito.
                    </p>
                </div>

                <nav data-footer-fade aria-label="Rodapé" className="md:col-span-2 md:col-start-7">
                    <p className="eyebrow mb-6 text-[9px] text-rambla-cream/40">Navegue</p>
                    <ul className="space-y-3">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} className="group/roll text-sm font-light text-rambla-cream/75 transition-colors hover:text-rambla-gold-soft">
                                    <RollText>{link.label}</RollText>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div data-footer-fade className="md:col-span-3">
                    <p className="eyebrow mb-6 text-[9px] text-rambla-cream/40">Contato</p>
                    <ul className="space-y-3 text-sm font-light text-rambla-cream/75">
                        <li>
                            <a href={`mailto:${contact.email}`} className="group/roll transition-colors hover:text-rambla-gold-soft">
                                <RollText>{contact.email}</RollText>
                            </a>
                        </li>
                        <li>
                            <a href={contact.phoneHref} className="group/roll transition-colors hover:text-rambla-gold-soft">
                                <RollText>{contact.phoneLabel}</RollText>
                            </a>
                        </li>
                        <li className="flex gap-6 pt-3">
                            <a href={contact.instagram} target="_blank" rel="noreferrer" className="group/roll eyebrow text-[9px] transition-colors hover:text-rambla-gold-soft">
                                <RollText>Instagram</RollText>
                            </a>
                            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="group/roll eyebrow text-[9px] transition-colors hover:text-rambla-gold-soft">
                                <RollText>WhatsApp</RollText>
                            </a>
                        </li>
                    </ul>
                </div>

                <div data-footer-fade className="flex md:col-span-1 md:justify-end">
                    <Magnetic strength={0.4}>
                        <button
                            type="button"
                            onClick={() => scrollToTarget(0)}
                            aria-label="Voltar ao topo"
                            className="group/top flex h-14 w-14 items-center justify-center rounded-full border border-rambla-cream/20 transition-colors duration-500 hover:border-rambla-gold hover:bg-rambla-gold"
                        >
                            <Arrow className="h-3.5 w-3.5 -rotate-45 transition-transform duration-500 group-hover/top:-translate-y-0.5" />
                        </button>
                    </Magnetic>
                </div>
            </div>

            <div data-footer-word aria-hidden="true" className="relative select-none px-4">
                <p className="flex justify-center overflow-hidden font-serif text-[26vw] font-medium leading-[0.78] tracking-[-0.03em]">
                    {Array.from(WORDMARK).map((char, index) => (
                        <span
                            key={index}
                            data-footer-char
                            className="inline-block bg-linear-to-b from-rambla-cream/90 via-rambla-cream/40 to-rambla-cream/0 bg-clip-text pb-[0.06em] text-transparent"
                        >
                            {char}
                        </span>
                    ))}
                </p>
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    className="absolute inset-x-0 bottom-0 h-16 w-[110%] -translate-x-[5%] animate-wave-drift text-rambla-gold/25 md:h-24"
                >
                    <path d="M0 70C120 30 240 30 360 70S600 110 720 70 960 30 1080 70 1320 110 1440 70" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M0 95C120 60 240 60 360 95S600 125 720 95 960 60 1080 95 1320 125 1440 95" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                </svg>
            </div>

            <div className="relative border-t border-rambla-cream/8">
                <div className="mx-auto flex max-w-360 flex-col gap-3 px-6 py-7 text-[10px] uppercase tracking-[0.2em] text-rambla-cream/40 md:flex-row md:items-center md:justify-between md:px-12">
                    <p>© 2026 Rambla Viagens. Todos os direitos reservados.</p>
                    <p>Roteiros sob medida · Nacionais & internacionais</p>
                </div>
            </div>
        </footer>
    );
}
