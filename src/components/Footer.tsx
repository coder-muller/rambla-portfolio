export default function Footer() {
    return (
        <footer className="bg-rambla-dark text-rambla-cream py-16 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                <div className="text-center md:text-left">
                    <img src="/rambla-horizontal.png" alt="Rambla Viagens" className="h-10 mx-auto md:mx-0 object-contain invert brightness-0 mb-4 opacity-50" />
                    <p className="font-sans text-[10px] text-rambla-cream/40 tracking-[0.2em] uppercase">
                        © 2026 Rambla Viagens. Todos os direitos reservados.
                    </p>
                </div>

                <div className="flex gap-8">
                    <a href="https://www.instagram.com/ramblaviagens" className="font-sans text-[10px] uppercase tracking-[0.2em] text-rambla-cream/60 hover:text-rambla-gold transition-colors">Instagram</a>
                    <a href="https://wa.me/5553999532345?text=Ol%C3%A1%21%20Gostaria%20de%20um%20or%C3%A7amento%20para%20uma%20viagem%20dos%20sonhos.%20Pode%20me%20ajudar%3F" className="font-sans text-[10px] uppercase tracking-[0.2em] text-rambla-cream/60 hover:text-rambla-gold transition-colors">WhatsApp</a>
                </div>
            </div>
        </footer>
    );
}
