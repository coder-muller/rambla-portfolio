import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, DESKTOP, FINE_POINTER, MOTION_OK } from '../lib/gsap';
import { services } from '../lib/content';
import { unsplash } from '../lib/media';
import Img from './ui/Img';
import Arrow from './ui/Arrow';

export default function Services() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;
            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                gsap.from(q('[data-services-heading] [data-line]'), {
                    yPercent: 115,
                    stagger: 0.1,
                    duration: 1.5,
                    scrollTrigger: { trigger: section, start: 'top 75%' },
                });
                gsap.from(q('[data-services-intro]'), {
                    opacity: 0,
                    y: 30,
                    duration: 1.4,
                    scrollTrigger: { trigger: section, start: 'top 70%' },
                });

                q('[data-service-row]').forEach((row) => {
                    gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 90%' } })
                        .from(row.querySelector('[data-service-rule]'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'expo.inOut' })
                        .from(row.querySelectorAll('[data-service-text]'), { opacity: 0, y: 26, stagger: 0.07, duration: 1.2 }, 0.25);
                });
            });

            // Prévia flutuante que acompanha o cursor sobre a lista.
            mm.add(`${DESKTOP} and ${FINE_POINTER} and ${MOTION_OK}`, () => {
                const list = section.querySelector<HTMLElement>('[data-services-list]');
                const preview = section.querySelector<HTMLElement>('[data-service-preview]');
                const stack = section.querySelector<HTMLElement>('[data-service-stack]');
                if (!list || !preview || !stack) return;

                gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.4, autoAlpha: 0 });
                const xTo = gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3' });
                const yTo = gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3' });
                const rotateTo = gsap.quickTo(preview, 'rotate', { duration: 0.9, ease: 'power3' });
                const rows = Array.from(section.querySelectorAll<HTMLElement>('[data-service-row]'));
                const pointer = { x: -1, y: -1 };
                let shown = false;
                let active = -1;

                const hide = () => {
                    if (!shown) return;
                    shown = false;
                    gsap.to(preview, { autoAlpha: 0, scale: 0.4, rotate: 0, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
                };

                // Confere a posição do ponteiro também durante o scroll: a lista pode passar por baixo
                // de um mouse parado sem disparar pointerenter/pointerleave.
                const sync = () => {
                    const bounds = list.getBoundingClientRect();
                    const inside =
                        pointer.x >= bounds.left && pointer.x <= bounds.right && pointer.y >= bounds.top && pointer.y <= bounds.bottom;
                    if (!inside) return hide();

                    const index = rows.findIndex((row) => {
                        const rect = row.getBoundingClientRect();
                        return pointer.y >= rect.top && pointer.y <= rect.bottom;
                    });
                    if (index !== -1 && index !== active) {
                        active = index;
                        gsap.to(stack, { yPercent: -100 * index, duration: 0.9, ease: 'expo.out', overwrite: 'auto' });
                    }
                    if (!shown) {
                        shown = true;
                        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'expo.out', overwrite: 'auto' });
                    }
                };

                const handleMove = (event: PointerEvent) => {
                    if (!shown) gsap.set(preview, { x: event.clientX, y: event.clientY });
                    rotateTo(gsap.utils.clamp(-12, 12, (event.clientX - pointer.x) * 0.8));
                    pointer.x = event.clientX;
                    pointer.y = event.clientY;
                    xTo(event.clientX);
                    yTo(event.clientY);
                    sync();
                };
                const handleWindowLeave = () => {
                    pointer.x = -1;
                    pointer.y = -1;
                    hide();
                };

                ScrollTrigger.create({ trigger: list, start: 'top bottom', end: 'bottom top', onUpdate: sync, onLeave: hide, onLeaveBack: hide });
                window.addEventListener('pointermove', handleMove, { passive: true });
                document.documentElement.addEventListener('pointerleave', handleWindowLeave);

                return () => {
                    window.removeEventListener('pointermove', handleMove);
                    document.documentElement.removeEventListener('pointerleave', handleWindowLeave);
                };
            });

            return () => mm.revert();
        },
        { scope: root },
    );

    return (
        <section ref={root} id="servicos" className="relative px-6 py-28 md:px-12 md:py-44">
            <div className="mx-auto max-w-360">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                    <div data-services-heading className="lg:col-span-7">
                        <p className="eyebrow mb-6 text-rambla-gold">(03) — O que oferecemos</p>
                        <h2 className="font-serif text-[clamp(2.6rem,5vw,5.2rem)] leading-[0.98] text-rambla-navy">
                            <span className="line-mask">
                                <span data-line className="block">
                                    Soluções completas,
                                </span>
                            </span>
                            <span className="line-mask">
                                <span data-line className="block font-light italic text-rambla-gold">
                                    detalhes impecáveis.
                                </span>
                            </span>
                        </h2>
                    </div>
                    <p
                        data-services-intro
                        className="max-w-md text-base font-light leading-relaxed text-rambla-navy/70 md:text-lg lg:col-span-4 lg:col-start-9"
                    >
                        Da emissão do bilhete aéreo ao concierge 24h. Cuidamos de todos os aspectos técnicos e burocráticos para que sua única
                        obrigação seja desfrutar o destino.
                    </p>
                </div>

                <ul data-services-list className="relative mt-20 border-b border-rambla-navy/10 md:mt-28">
                    {services.map((service, index) => (
                        <li key={service.title} data-service-row className="group/row relative">
                            <span data-service-rule className="absolute inset-x-0 top-0 h-px bg-rambla-navy/10" />
                            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-rambla-gold transition-transform duration-1000 ease-out-expo group-hover/row:scale-x-100" />
                            <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-4 py-9 md:py-11">
                                <span data-service-text className="col-span-2 font-sans text-[10px] tracking-[0.2em] text-rambla-navy/40 md:col-span-1">
                                    0{index + 1}
                                </span>
                                <h3
                                    data-service-text
                                    className="col-span-10 font-serif text-[clamp(1.9rem,3.2vw,3.2rem)] leading-none text-rambla-navy transition-[color,translate] duration-700 ease-out-expo group-hover/row:translate-x-3 group-hover/row:text-rambla-gold md:col-span-5"
                                >
                                    {service.title}
                                </h3>
                                <p
                                    data-service-text
                                    className="col-span-12 col-start-1 text-sm font-light leading-relaxed text-rambla-navy/65 md:col-span-5 md:col-start-7 md:text-base"
                                >
                                    {service.description}
                                </p>
                                <span data-service-text className="col-span-1 hidden justify-end self-center md:flex">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rambla-navy/15 text-rambla-navy transition-all duration-700 ease-out-expo group-hover/row:rotate-45 group-hover/row:border-rambla-gold group-hover/row:bg-rambla-gold group-hover/row:text-rambla-cream">
                                        <Arrow className="h-3 w-3" />
                                    </span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                data-service-preview
                aria-hidden="true"
                className="pointer-events-none invisible fixed left-0 top-0 z-30 hidden h-[340px] w-[260px] overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(29,50,75,0.6)] lg:block"
            >
                <div data-service-stack className="h-full w-full">
                    {services.map((service) => (
                        <Img key={service.title} src={unsplash(service.image, 640)} alt="" loading="lazy" className="block h-full w-full object-cover" />
                    ))}
                </div>
            </div>
        </section>
    );
}
