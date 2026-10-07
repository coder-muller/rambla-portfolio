import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

export function initSmoothScroll() {
    if (lenis || prefersReducedMotion()) return () => {};

    lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.9,
        anchors: true,
    });

    // A abertura pode ter travado o scroll antes do Lenis existir.
    if (document.documentElement.classList.contains('is-locked')) lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        lenis = null;
    };
}

export function scrollToTarget(target: string | number | HTMLElement) {
    if (lenis) {
        lenis.scrollTo(target, { duration: 1.6 });
        return;
    }

    if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
        return;
    }

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: 'smooth' });
}

/** Ao abrir um link com âncora (ex.: /#contato), vai direto para a seção. */
export function jumpToHash() {
    const { hash } = window.location;
    if (!hash) return;

    try {
        const element = document.querySelector<HTMLElement>(hash);
        if (!element) return;
        if (lenis) lenis.scrollTo(element, { immediate: true, force: true });
        else element.scrollIntoView();
    } catch {
        // Âncora que não é um seletor válido: ignora.
    }
}

export function lockScroll() {
    document.documentElement.classList.add('is-locked');
    lenis?.stop();
}

export function unlockScroll() {
    document.documentElement.classList.remove('is-locked');
    lenis?.start();
}
