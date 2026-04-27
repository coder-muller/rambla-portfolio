export default function Hero() {
    return (
        <section className="relative pt-36 pb-32 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden bg-rambla-cream min-h-[90vh] md:min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full mt-8 md:mt-0">
                <div className="lg:col-span-7 relative z-10 order-2 lg:order-1 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6 md:mb-8 animate-[fadeInUp_1s_ease-out_forwards]" style={{ opacity: 0 }}>
                        <div className="w-12 h-px bg-rambla-gold"></div>
                        <p className="font-sans text-rambla-gold uppercase tracking-[0.3em] text-xs font-semibold">Agência de Viagens</p>
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] md:leading-[0.95] text-rambla-navy mb-8 animate-[fadeInUp_1s_ease-out_forwards]" style={{ animationDelay: '200ms', opacity: 0 }}>
                        O mundo em <br className="hidden md:block" />
                        sua forma mais <br className="hidden md:block" />
                        <span className="italic text-rambla-gold">exclusiva.</span>
                    </h1>

                    <p className="font-sans text-rambla-navy/70 text-lg font-light max-w-lg mb-10 md:mb-12 animate-[fadeInUp_1s_ease-out_forwards]" style={{ animationDelay: '400ms', opacity: 0 }}>
                        Desenhamos roteiros sob medida e curadoria de experiências para quem busca viajar com elegância, conforto e propósito.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 animate-[fadeInUp_1s_ease-out_forwards] w-full max-w-md sm:max-w-none" style={{ animationDelay: '600ms', opacity: 0 }}>
                        <a href="#contato" className="group relative inline-flex items-center justify-center bg-rambla-navy text-rambla-cream px-6 sm:px-8 py-4 font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs overflow-hidden text-center">
                            <span className="relative z-10 group-hover:text-rambla-navy transition-colors duration-500">Começar Planejamento</span>
                            <div className="absolute inset-0 bg-rambla-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                        </a>
                        <a href="#experiencias" className="inline-flex items-center justify-center px-6 sm:px-8 py-4 font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs text-rambla-navy border border-rambla-navy/20 hover:border-rambla-gold hover:text-rambla-gold transition-colors duration-300 text-center">
                            Descobrir Destinos
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-5 relative order-1 lg:order-2 animate-[fadeInUp_1.5s_ease-out_forwards]" style={{ animationDelay: '300ms', opacity: 0 }}>
                    <div className="relative w-full max-w-[320px] md:max-w-100 mx-auto lg:ml-auto lg:mr-0 aspect-3/4 rounded-t-full overflow-hidden shadow-2xl border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1500&auto=format&fit=crop"
                            alt="Arquitetura de Destino Exclusivo"
                            className="w-full h-full object-cover animate-slow-pan" />
                        <div className="absolute inset-0 border-t-20px border-rambla-cream/20 rounded-t-full mix-blend-overlay"></div>
                    </div>

                    <div className="absolute top-1/3 -left-8 md:-left-16 bg-white/90 backdrop-blur-md px-6 py-5 shadow-[0_20px_40px_-15px_rgba(29,50,75,0.1)] rounded-sm hidden sm:block animate-[fadeInUp_1s_ease-out_forwards]" style={{ animationDelay: '1s', opacity: 0 }}>
                        <p className="font-serif italic text-2xl text-rambla-navy leading-none mb-2">Personalizado</p>
                        <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rambla-gold">Do seu jeito</p>
                    </div>

                    <div className="absolute -bottom-6 right-4 md:-right-6 w-24 h-24 bg-rambla-gold/10 rounded-full blur-2xl"></div>
                </div>
            </div>

            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 group animate-[fadeInUp_1s_ease-out_forwards] w-full max-w-50" style={{ animationDelay: '1.2s', opacity: 0 }}>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-rambla-navy/40 group-hover:text-rambla-gold transition-colors text-center">Explore mais</span>
                <div className="w-px h-12 bg-rambla-navy/10 relative overflow-hidden mx-auto">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-rambla-gold animate-[slideDown_1.5s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </section>
    );
}
