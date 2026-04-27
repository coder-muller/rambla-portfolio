import { useEffect, useState } from 'react';
import './index.css';

function App() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

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

            {/* Floating Navigation */}
            <nav className={`fixed w-full z-50 top-0 transition-all duration-500 border-b border-rambla-navy/5 ${scrolled || mobileMenuOpen ? 'bg-rambla-cream/95 backdrop-blur-md py-3 shadow-sm' : 'bg-rambla-cream py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
                    <a href="#" className="block relative z-10 transition-transform hover:scale-105 duration-300">
                        {/* Using the actual logo with mix-blend-multiply to remove the white background */}
                        <img src="/rambla-horizontal.png" alt="Rambla Viagens" className={`object-contain transition-all duration-500 ${scrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`} />
                    </a>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-10 font-sans text-xs tracking-[0.15em] uppercase font-medium text-rambla-navy">
                        <a href="#experiencias" className="hover:text-rambla-gold transition-colors">Experiências</a>
                        <a href="#servicos" className="hover:text-rambla-gold transition-colors">Serviços</a>
                        <a href="#contato" className="hover:text-rambla-gold transition-colors">Contato</a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden relative z-10 p-2 w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className="relative w-6 h-[14px]">
                            <span className={`absolute left-0 w-full h-[2px] bg-rambla-navy transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}></span>
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-rambla-navy transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
                            <span className={`absolute left-0 w-full h-[2px] bg-rambla-navy transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-rambla-cream/95 backdrop-blur-md border-b border-rambla-navy/5 shadow-sm transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-64 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
                    <div className="flex flex-col space-y-6 px-6 text-center font-sans text-xs tracking-[0.2em] uppercase font-medium text-rambla-navy">
                        <a href="#experiencias" onClick={() => setMobileMenuOpen(false)} className="hover:text-rambla-gold transition-colors block">Experiências</a>
                        <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="hover:text-rambla-gold transition-colors block">Serviços</a>
                        <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="hover:text-rambla-gold transition-colors block">Contato</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Editorial Layout */}
            <section className="relative pt-36 pb-32 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden bg-rambla-cream min-h-[90vh] md:min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full mt-8 md:mt-0">

                    {/* Text Content */}
                    <div className="lg:col-span-7 relative z-10 order-2 lg:order-1 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6 md:mb-8 animate-[fadeInUp_1s_ease-out_forwards]" style={{ opacity: 0 }}>
                            <div className="w-12 h-px bg-rambla-gold"></div>
                            <p className="font-sans text-rambla-gold uppercase tracking-[0.3em] text-xs font-semibold">Agência de Viagens Boutique</p>
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

                    {/* Arch Image Layout - Echoing the Logo's Dome */}
                    <div className="lg:col-span-5 relative order-1 lg:order-2 animate-[fadeInUp_1.5s_ease-out_forwards]" style={{ animationDelay: '300ms', opacity: 0 }}>
                        <div className="relative w-full max-w-[320px] md:max-w-100 mx-auto lg:ml-auto lg:mr-0 aspect-3/4 rounded-t-full overflow-hidden shadow-2xl border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1500&auto=format&fit=crop"
                                alt="Arquitetura de Destino Exclusivo"
                                className="w-full h-full object-cover animate-slow-pan" />
                            <div className="absolute inset-0 border-t-20px border-rambla-cream/20 rounded-t-full mix-blend-overlay"></div>
                        </div>

                        {/* Floating Elements overlapping the arch to break the grid */}
                        <div className="absolute top-1/3 -left-8 md:-left-16 bg-white/90 backdrop-blur-md px-6 py-5 shadow-[0_20px_40px_-15px_rgba(29,50,75,0.1)] rounded-sm hidden sm:block animate-[fadeInUp_1s_ease-out_forwards]" style={{ animationDelay: '1s', opacity: 0 }}>
                            <p className="font-serif italic text-2xl text-rambla-navy leading-none mb-2">Personalizado</p>
                            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-rambla-gold">Do seu jeito</p>
                        </div>

                        <div className="absolute -bottom-6 right-4 md:-right-6 w-24 h-24 bg-rambla-gold/10 rounded-full blur-2xl"></div>
                    </div>
                </div>

                {/* Scroll Indicator explicitly pulling down - shows there is more content */}
                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 group animate-[fadeInUp_1s_ease-out_forwards] w-full max-w-[200px]" style={{ animationDelay: '1.2s', opacity: 0 }}>
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-rambla-navy/40 group-hover:text-rambla-gold transition-colors text-center">Explore mais</span>
                    <div className="w-px h-12 bg-rambla-navy/10 relative overflow-hidden mx-auto">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-rambla-gold animate-[slideDown_1.5s_ease-in-out_infinite]"></div>
                    </div>
                </div>
            </section>

            {/* Intro Section - Starts right away without huge empty spaces */}
            <section id="experiencias" className="pt-24 pb-32 md:py-32 px-6 md:px-12 max-w-7xl mx-auto bg-rambla-cream relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div className="reveal">
                        <h2 className="font-serif text-4xl md:text-6xl text-rambla-navy leading-tight mb-8">
                            Elegância em cada <br /><span className="italic text-rambla-gold">detalhe</span>.
                        </h2>
                        <p className="font-sans text-lg text-rambla-navy/70 leading-relaxed mb-6 font-light">
                            Na Rambla Viagens, acreditamos que viajar é mais do que visitar lugares; é colecionar momentos inesquecíveis. Nossa expertise transforma o planejamento complexo em uma experiência fluida e prazerosa.
                        </p>
                        <p className="font-sans text-lg text-rambla-navy/70 leading-relaxed font-light">
                            Cuidamos de tudo, do momento em que você sai de casa até o seu retorno, seja para uma escapada nacional ou uma exploração internacional imersiva.
                        </p>
                    </div>
                    <div className="relative reveal h-100 md:h-150 mt-10 md:mt-0">
                        <img src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=2072&auto=format&fit=crop"
                            alt="Coastal View"
                            className="w-full h-full object-cover rounded-tl-[100px] md:rounded-tl-[150px] rounded-br-[100px] md:rounded-br-[150px] shadow-xl" />
                        <div className="absolute -bottom-12 sm:-bottom-8 left-0 sm:-left-4 md:-left-12 bg-rambla-navy text-rambla-cream p-6 md:p-10 w-[90%] sm:max-w-70 shadow-2xl z-10">
                            <p className="font-serif italic text-xl md:text-2xl mb-2 leading-snug">"Descobrir é a verdadeira viagem."</p>
                            <div className="w-8 h-px bg-rambla-gold mt-4"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicos" className="py-24 md:py-32 bg-rambla-cream text-rambla-navy px-6 md:px-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 reveal border-b border-rambla-navy/10 pb-16">
                        <div className="max-w-2xl">
                            <p className="font-sans text-rambla-gold uppercase tracking-[0.2em] text-sm mb-6 font-semibold">O que oferecemos</p>
                            <h2 className="font-serif text-[2.5rem] md:text-5xl lg:text-6xl leading-tight">
                                Soluções completas, <br/><span className="italic font-light text-rambla-gold">detalhes impecáveis.</span>
                            </h2>
                        </div>
                        <p className="font-sans font-light text-rambla-navy/70 max-w-sm text-base md:text-lg leading-relaxed">
                            Da emissão do bilhete aéreo ao concierge 24h. Cuidamos de todos os aspectos técnicos e burocráticos para sua única obrigação ser desfrutar o destino.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {[
                            { 
                                n: "01", 
                                t: "Voos & Conexões", 
                                d: "Emissão de passagens aéreas nacionais e internacionais. Buscamos ativamente as melhores rotas, conexões e upgrades, otimizando o seu tempo e conforto no ar." 
                            },
                            { 
                                n: "02", 
                                t: "Hospedagem & Curadoria", 
                                d: "Seleção criteriosa de hotéis de luxo, resorts e vilas particulares. Escolhemos propriedades com alma, história e localização estratégica para o seu perfil." 
                            },
                            { 
                                n: "03", 
                                t: "Mobilidade Premium", 
                                d: "Locação de veículos de alto padrão. Desde carros esportivos para rotas cênicas, transfers privativos até motorhomes equipados para viagens de imersão." 
                            },
                            { 
                                n: "04", 
                                t: "Tickets & Atrações", 
                                d: "Acesso antecipado e sem filas aos principais pontos turísticos, shows, exposições e eventos esportivos concorridos ao redor do mundo." 
                            },
                            { 
                                n: "05", 
                                t: "Viagens em Grupo", 
                                d: "Sincronia logística absoluta para famílias e grupos. Organizamos de forma centralizada as estadias, passeios e voos para uma experiência sem fricções." 
                            },
                            { 
                                n: "06", 
                                t: "Segurança & Suporte", 
                                d: "Tranquilidade do início ao fim com seguro viagem completo, conectividade global (chips e eSIMs) e um concierge sempre à disposição." 
                            }
                        ].map((s, i) => (
                            <div key={i} className="group reveal flex flex-col relative pt-6 border-t border-rambla-navy/10 hover:border-rambla-gold transition-colors duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="flex items-start justify-between mb-5">
                                    <h3 className="font-serif text-2xl text-rambla-navy group-hover:text-rambla-gold transition-colors duration-500">{s.t}</h3>
                                    <span className="font-sans text-[10px] tracking-[0.2em] text-rambla-navy/30 font-semibold group-hover:text-rambla-gold/60 transition-colors">{s.n}</span>
                                </div>
                                <p className="font-sans font-light text-base text-rambla-navy/70 leading-relaxed">
                                    {s.d}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Break / Parallax */}
            <section className="relative h-[50vh] md:h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490237194689-1fc7b165bf2f?q=80&w=2000&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-rambla-navy/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-rambla-navy/90 via-transparent to-rambla-cream/20"></div>

                <div className="relative z-10 text-center px-6">
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-rambla-cream italic mb-4 drop-shadow-2xl tracking-wide">Colecione Horizontes</h2>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contato" className="py-24 md:py-32 px-6 md:px-12 bg-rambla-cream relative">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
                    <div className="lg:col-span-2 reveal">
                        <div className="sticky top-32">
                            <p className="font-sans text-rambla-gold uppercase tracking-[0.2em] text-sm mb-4">Comece sua jornada</p>
                            <h2 className="font-serif text-4xl md:text-5xl text-rambla-navy mb-8 leading-tight">Vamos planejar seu próximo destino.</h2>
                            <p className="font-sans font-light text-rambla-navy/80 mb-12 leading-relaxed">
                                Preencha o formulário e um de nossos especialistas em design de viagens entrará em contato para entender seus desejos.
                            </p>

                            <div className="space-y-8 font-sans font-light text-sm">
                                <div className="flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-full border border-rambla-gold flex items-center justify-center text-rambla-gold">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <a href="mailto:contato@ramblaviagens.com.br" className="hover:text-rambla-gold transition-colors text-rambla-navy">contato@ramblaviagens.com.br</a>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-full border border-rambla-gold flex items-center justify-center text-rambla-gold">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    </div>
                                    <a href="tel:+551199999999" className="hover:text-rambla-gold transition-colors text-rambla-navy">+55 (11) 9999-9999</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 reveal">
                        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(29,50,75,0.05)] border border-rambla-navy/5 relative">
                            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-rambla-gold/30 -mt-2 -mr-2"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-rambla-gold/30 -mb-2 -ml-2"></div>

                            <div className="space-y-10 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Nome Completo</label>
                                        <input type="text" required placeholder="Como prefere ser chamado?" className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30" />
                                    </div>
                                    <div className="relative group">
                                        <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">E-mail</label>
                                        <input type="email" required placeholder="seu.melhor@email.com" className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Telefone / WhatsApp</label>
                                        <input type="tel" placeholder="(00) 00000-0000" className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30" />
                                    </div>
                                    <div className="relative group">
                                        <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Serviço Desejado</label>
                                        <select className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent appearance-none cursor-pointer" defaultValue="">
                                            <option value="" disabled className="text-rambla-navy/50">Selecione uma opção</option>
                                            <option value="roteiro">Roteiro Personalizado</option>
                                            <option value="passagens">Passagens Aéreas</option>
                                            <option value="hoteis">Reserva de Hotéis</option>
                                            <option value="grupo">Viagem em Grupo</option>
                                            <option value="completo">Pacote Completo</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Destino dos Sonhos</label>
                                        <input type="text" placeholder="Ex: Paris, Maldivas, Nordeste..." className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30" />
                                    </div>
                                    <div className="relative group">
                                        <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Data Prevista</label>
                                        <input type="month" className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent text-rambla-navy/80 uppercase placeholder-rambla-navy/30" />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Detalhes da Viagem</label>
                                    <textarea rows={3} placeholder="Conte-nos um pouco sobre a viagem dos seus sonhos, número de pessoas, preferências..." className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent resize-none placeholder-rambla-navy/30"></textarea>
                                </div>

                                <button type="submit" className="group relative w-full inline-flex items-center justify-center bg-rambla-navy text-rambla-cream px-8 py-5 font-sans uppercase tracking-[0.2em] text-xs overflow-hidden mt-4">
                                    <span className="relative z-10 group-hover:text-rambla-navy transition-colors duration-500">Enviar Solicitação</span>
                                    <div className="absolute inset-0 bg-rambla-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-rambla-dark text-rambla-cream py-16 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="text-center md:text-left">
                        {/* Small inverted logo in footer */}
                        <img src="/rambla-horizontal.png" alt="Rambla Viagens" className="h-10 mx-auto md:mx-0 object-contain invert brightness-0 mb-4 opacity-50" />
                        <p className="font-sans text-[10px] text-rambla-cream/40 tracking-[0.2em] uppercase">
                            © 2026 Rambla Viagens. Todos os direitos reservados.
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-rambla-cream/60 hover:text-rambla-gold transition-colors">Instagram</a>
                        <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-rambla-cream/60 hover:text-rambla-gold transition-colors">WhatsApp</a>
                        <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-rambla-cream/60 hover:text-rambla-gold transition-colors">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;