export default function Services() {
    return (
        <section id="servicos" className="py-24 md:py-32 bg-rambla-cream text-rambla-navy px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 reveal border-b border-rambla-navy/10 pb-16">
                    <div className="max-w-2xl">
                        <p className="font-sans text-rambla-gold uppercase tracking-[0.2em] text-sm mb-6 font-semibold">O que oferecemos</p>
                        <h2 className="font-serif text-[2.5rem] md:text-5xl lg:text-6xl leading-tight">
                            Soluções completas, <br /><span className="italic font-light text-rambla-gold">detalhes impecáveis.</span>
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
                            d: "Seleção criteriosa de hotéis, resorts e acomodações únicas. Escolhemos propriedades com alma, história e localização estratégica para o seu perfil."
                        },
                        {
                            n: "03",
                            t: "Aluguel de Veículos",
                            d: "Locação de veículos que trazem mais mobilidade à sua viagem, desde carros esportivos para rotas cênicas e transfers privativos até motorhomes equipados para experiências incríveis."
                        },
                        {
                            n: "04",
                            t: "Tickets & Atrações",
                            d: "Acesso antecipado e sem filas aos principais pontos turísticos, shows, exposições e eventos esportivos concorridos ao redor do mundo."
                        },
                        {
                            n: "05",
                            t: "Viagens em Grupo",
                            d: "Sincronia logística absoluta para famílias e grupos. Organizamos de forma centralizada as estadias, passeios e voos para uma experiência sem complicações."
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
    );
}
