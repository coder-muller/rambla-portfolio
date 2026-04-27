export default function Intro() {
    return (
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
    );
}
