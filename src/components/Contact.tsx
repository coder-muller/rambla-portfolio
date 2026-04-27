import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactFormSchema, serviceLabels } from '../lib/contactForm';
import type { ContactFormData, ContactFormValues } from '../lib/contactForm';

type ApiResponse = {
    ok: boolean;
    message: string;
    fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
};

const defaultValues: Partial<ContactFormValues> = {
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    details: '',
    website: '',
};

export default function Contact() {
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues, unknown, ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues,
    });

    const onSubmit = async (data: ContactFormData) => {
        setFormMessage(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const body = await response.json().catch(() => null) as ApiResponse | null;

            if (!response.ok || !body?.ok) {
                if (body?.fieldErrors) {
                    for (const [field, messages] of Object.entries(body.fieldErrors)) {
                        const message = messages?.[0];

                        if (message) {
                            setError(field as keyof ContactFormValues, { message });
                        }
                    }
                }

                throw new Error(body?.message ?? 'Não foi possível enviar sua solicitação agora.');
            }

            reset(defaultValues);
            setFormMessage({ type: 'success', text: body.message });
        } catch (error) {
            setFormMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Não foi possível enviar sua solicitação agora.',
            });
        }
    };

    return (
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
                                <a href="tel:+5553999532345" className="hover:text-rambla-gold transition-colors text-rambla-navy">+55 (53) 99953-2345</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 reveal">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-white p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(29,50,75,0.05)] border border-rambla-navy/5 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-rambla-gold/30 -mt-2 -mr-2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-rambla-gold/30 -mb-2 -ml-2"></div>

                        <div className="space-y-10 relative z-10">
                            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register('website')} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <label htmlFor="contact-name" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Nome Completo</label>
                                    <input id="contact-name" type="text" autoComplete="name" placeholder="Como prefere ser chamado?" aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'contact-name-error' : undefined} className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30 aria-[invalid=true]:border-red-700" {...register('name')} />
                                    {errors.name?.message && <p id="contact-name-error" role="alert" className="mt-2 font-sans text-xs text-red-700">{errors.name.message}</p>}
                                </div>
                                <div className="relative group">
                                    <label htmlFor="contact-email" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">E-mail</label>
                                    <input id="contact-email" type="email" autoComplete="email" placeholder="seu.melhor@email.com" aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'contact-email-error' : undefined} className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30 aria-[invalid=true]:border-red-700" {...register('email')} />
                                    {errors.email?.message && <p id="contact-email-error" role="alert" className="mt-2 font-sans text-xs text-red-700">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <label htmlFor="contact-phone" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Telefone / WhatsApp</label>
                                    <input id="contact-phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" aria-invalid={errors.phone ? 'true' : 'false'} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30 aria-[invalid=true]:border-red-700" {...register('phone')} />
                                    {errors.phone?.message && <p id="contact-phone-error" role="alert" className="mt-2 font-sans text-xs text-red-700">{errors.phone.message}</p>}
                                </div>
                                <div className="relative group">
                                    <label htmlFor="contact-service" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Serviço Desejado</label>
                                    <select id="contact-service" aria-invalid={errors.service ? 'true' : 'false'} aria-describedby={errors.service ? 'contact-service-error' : undefined} className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent appearance-none cursor-pointer aria-[invalid=true]:border-red-700" defaultValue="" {...register('service')}>
                                        <option value="" disabled className="text-rambla-navy/50">Selecione uma opção</option>
                                        {Object.entries(serviceLabels).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                    {errors.service?.message && <p id="contact-service-error" role="alert" className="mt-2 font-sans text-xs text-red-700">{errors.service.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <label htmlFor="contact-destination" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Destino dos Sonhos</label>
                                    <input id="contact-destination" type="text" placeholder="Ex: Paris, Maldivas, Nordeste..." aria-invalid={errors.destination ? 'true' : 'false'} aria-describedby={errors.destination ? 'contact-destination-error' : undefined} className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent placeholder-rambla-navy/30 aria-[invalid=true]:border-red-700" {...register('destination')} />
                                    {errors.destination?.message && <p id="contact-destination-error" role="alert" className="mt-2 font-sans text-xs text-red-700">{errors.destination.message}</p>}
                                </div>
                                <div className="relative group">
                                    <label htmlFor="contact-travel-date" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Data Prevista</label>
                                    <input id="contact-travel-date" type="month" aria-invalid={errors.travelDate ? 'true' : 'false'} aria-describedby={errors.travelDate ? 'contact-travel-date-error' : undefined} className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent text-rambla-navy/80 uppercase placeholder-rambla-navy/30 aria-[invalid=true]:border-red-700" {...register('travelDate')} />
                                    {errors.travelDate?.message && <p id="contact-travel-date-error" role="alert" className="mt-2 font-sans text-xs text-red-700">{errors.travelDate.message}</p>}
                                </div>
                            </div>

                            <div className="relative group">
                                <label htmlFor="contact-details" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-rambla-gold mb-2">Detalhes da Viagem</label>
                                <textarea id="contact-details" rows={3} placeholder="Conte-nos um pouco sobre a viagem dos seus sonhos, número de pessoas, preferências..." aria-invalid={errors.details ? 'true' : 'false'} aria-describedby={errors.details ? 'contact-details-error' : undefined} className="w-full text-base pb-3 border-b border-rambla-navy/20 focus:border-rambla-gold transition-colors bg-transparent resize-none placeholder-rambla-navy/30 aria-[invalid=true]:border-red-700" {...register('details')}></textarea>
                                {errors.details?.message && <p id="contact-details-error" role="alert" className="mt-2 font-sans text-xs text-red-700">{errors.details.message}</p>}
                            </div>

                            {formMessage && (
                                <p role="status" className={`font-sans text-sm ${formMessage.type === 'success' ? 'text-rambla-navy' : 'text-red-700'}`}>
                                    {formMessage.text}
                                </p>
                            )}

                            <button type="submit" disabled={isSubmitting} className="group relative w-full inline-flex items-center justify-center bg-rambla-navy text-rambla-cream px-8 py-5 font-sans uppercase tracking-[0.2em] text-xs overflow-hidden mt-4 disabled:cursor-not-allowed disabled:bg-rambla-navy/70">
                                <span className="relative z-10 group-hover:text-rambla-navy group-disabled:text-rambla-cream transition-colors duration-500">{isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}</span>
                                <div className="absolute inset-0 bg-rambla-gold scale-x-0 origin-left group-hover:scale-x-100 group-disabled:hidden transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
