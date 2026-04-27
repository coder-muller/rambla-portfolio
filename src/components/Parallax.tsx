export default function Parallax() {
    return (
        <section className="relative h-[50vh] md:h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490237194689-1fc7b165bf2f?q=80&w=2000&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-rambla-navy/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-linear-to-t from-rambla-navy/90 via-transparent to-rambla-cream/20"></div>

            <div className="relative z-10 text-center px-6">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-rambla-cream italic mb-4 drop-shadow-2xl tracking-wide">Colecione Horizontes</h2>
            </div>
        </section>
    );
}
