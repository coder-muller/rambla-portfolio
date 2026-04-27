import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // init
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed w-full z-50 top-0 transition-all duration-500 border-b border-rambla-navy/5 ${scrolled || mobileMenuOpen ? 'bg-rambla-cream/95 backdrop-blur-md py-3 shadow-sm' : 'bg-rambla-cream py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
                    <a href="#" className="block relative z-10 transition-transform hover:scale-105 duration-300">
                        <img src="/rambla-horizontal.png" alt="Rambla Viagens" className={`object-contain transition-all duration-500 ${scrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`} />
                    </a>

                    <div className="hidden md:flex space-x-10 font-sans text-xs tracking-[0.15em] uppercase font-medium text-rambla-navy">
                        <a href="#experiencias" className="hover:text-rambla-gold transition-colors">Experiências</a>
                        <a href="#servicos" className="hover:text-rambla-gold transition-colors">Serviços</a>
                        <a href="#contato" className="hover:text-rambla-gold transition-colors">Contato</a>
                    </div>

                    <button
                        className="md:hidden relative z-10 p-2 w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className="relative w-6 h-3.5">
                            <span className={`absolute left-0 w-full h-0.5 bg-rambla-navy transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}></span>
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-rambla-navy transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
                            <span className={`absolute left-0 w-full h-0.5 bg-rambla-navy transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}></span>
                        </div>
                    </button>
                </div>

                <div className={`md:hidden absolute top-full left-0 w-full bg-rambla-cream/95 backdrop-blur-md border-b border-rambla-navy/5 shadow-sm transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-64 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
                    <div className="flex flex-col space-y-6 px-6 text-center font-sans text-xs tracking-[0.2em] uppercase font-medium text-rambla-navy">
                        <a href="#experiencias" onClick={() => setMobileMenuOpen(false)} className="hover:text-rambla-gold transition-colors block">Experiências</a>
                        <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="hover:text-rambla-gold transition-colors block">Serviços</a>
                        <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="hover:text-rambla-gold transition-colors block">Contato</a>
                    </div>
                </div>
            </nav>
        </>
    );
}
