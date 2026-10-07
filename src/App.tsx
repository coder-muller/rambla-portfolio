import { useEffect, useMemo, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { initSmoothScroll, jumpToHash } from './lib/scroll';
import { IntroContext, shouldPlayIntro } from './lib/intro';

import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import Destinations from './components/Destinations';
import Services from './components/Services';
import Process from './components/Process';
import Horizons from './components/Horizons';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    const [played] = useState(shouldPlayIntro);
    const [revealed, setRevealed] = useState(!played);
    const [introDone, setIntroDone] = useState(!played);
    const intro = useMemo(() => ({ played, revealed }), [played, revealed]);

    useEffect(() => {
        const destroy = initSmoothScroll();
        document.fonts?.ready.then(() => {
            ScrollTrigger.refresh();
            jumpToHash();
        });
        return destroy;
    }, []);

    return (
        <IntroContext.Provider value={intro}>
            {!introDone && <Preloader onReveal={() => setRevealed(true)} onComplete={() => setIntroDone(true)} />}
            <Cursor />
            <div className="grain" aria-hidden="true" />
            <Navbar />
            <main>
                <Hero />
                <Marquee />
                <Manifesto />
                <Destinations />
                <Services />
                <Process />
                <Horizons />
                <Contact />
            </main>
            <Footer />
        </IntroContext.Provider>
    );
}

export default App;
