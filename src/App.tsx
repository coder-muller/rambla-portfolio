import { useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import Parallax from './components/Parallax';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll(".reveal");
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // init

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="texture-overlay"></div>
            <Navbar />
            <Hero />
            <Intro />
            <Services />
            <Parallax />
            <Contact />
            <Footer />
        </>
    );
}

export default App;
