import { createContext, useContext } from 'react';
import { prefersReducedMotion } from './gsap';

const INTRO_KEY = 'rambla:intro-seen';

export type IntroState = {
    /** A abertura com o logo está sendo exibida nesta visita. */
    played: boolean;
    /** O conteúdo já pode animar a entrada (fim da abertura ou sem abertura). */
    revealed: boolean;
};

export const IntroContext = createContext<IntroState>({ played: false, revealed: true });

export const useIntro = () => useContext(IntroContext);

export function shouldPlayIntro() {
    if (prefersReducedMotion() || window.location.hash) return false;

    try {
        return sessionStorage.getItem(INTRO_KEY) !== '1';
    } catch {
        return true;
    }
}

export function markIntroSeen() {
    try {
        sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
        // Armazenamento indisponível (aba privada): a abertura volta a tocar, sem prejuízo.
    }
}
