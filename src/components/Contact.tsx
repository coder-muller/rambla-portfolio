import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactFormSchema, serviceLabels } from '../lib/contactForm';
import type { ContactFormData, ContactFormValues } from '../lib/contactForm';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';
import { onDestinationRequest } from '../lib/events';
import { contact } from '../lib/content';
import Magnetic from './ui/Magnetic';
import RollText from './ui/RollText';
import Arrow from './ui/Arrow';

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

const channels = [
    { label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'Telefone', value: contact.phoneLabel, href: contact.phoneHref },
    { label: 'WhatsApp', value: 'Conversar agora', href: contact.whatsapp, external: true },
    { label: 'Instagram', value: '@ramblaviagens', href: contact.instagram, external: true },
];

export default function Contact() {
    const root = useRef<HTMLElement>(null);
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues, unknown, ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues,
    });

    // Um clique em um card de destino já deixa o destino preenchido aqui.
    useEffect(
        () =>
            onDestinationRequest((destination) => {
                setValue('destination', destination, { shouldDirty: true });
                const field = root.current?.querySelector('[data-field="destination"]');
                if (field) {
                    gsap.fromTo(field, { backgroundColor: 'rgba(177,128,60,0.18)' }, { backgroundColor: 'rgba(177,128,60,0)', duration: 2.4, delay: 1.2 });
                }
            }),
        [setValue],
    );

    useGSAP(
        () => {
            const section = root.current;
            if (!section) return;
            const q = gsap.utils.selector(section);
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                gsap.from(q('[data-contact-heading] [data-line]'), {
                    yPercent: 115,
                    stagger: 0.1,
                    duration: 1.5,
                    scrollTrigger: { trigger: section, start: 'top 70%' },
                });
                gsap.from(q('[data-contact-fade]'), {
                    opacity: 0,
                    y: 30,
                    stagger: 0.08,
                    duration: 1.3,
                    scrollTrigger: { trigger: section, start: 'top 60%' },
                });
                gsap.from(q('[data-field]'), {
                    opacity: 0,
                    y: 34,
                    stagger: 0.07,
                    duration: 1.3,
                    scrollTrigger: { trigger: q('form')[0], start: 'top 80%' },
                });
            });

            return () => mm.revert();
        },
        { scope: root },
    );

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
            const body = (await response.json().catch(() => null)) as ApiResponse | null;

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

    const describedBy = (field: keyof ContactFormValues) => (errors[field] ? `contact-${field}-error` : undefined);
    const errorFor = (field: keyof ContactFormValues) =>
        errors[field]?.message && (
            <p id={`contact-${field}-error`} role="alert" className="field-error">
                {errors[field]?.message}
            </p>
        );

    return (
        <section ref={root} id="contato" className="relative overflow-hidden bg-rambla-navy px-6 py-28 text-rambla-cream md:px-12 md:py-40">
            <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-rambla-gold/10 blur-[120px]" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-360 grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-36">
                        <div data-contact-heading>
                            <p className="eyebrow mb-6 text-rambla-gold-soft">(05) — Comece sua jornada</p>
                            <h2 className="font-serif text-[clamp(2.6rem,4.6vw,4.8rem)] font-light leading-[0.98]">
                                <span className="line-mask">
                                    <span data-line className="block">
                                        Vamos planejar
                                    </span>
                                </span>
                                <span className="line-mask">
                                    <span data-line className="block">
                                        o seu <em className="text-rambla-gold-soft">próximo</em>
                                    </span>
                                </span>
                                <span className="line-mask">
                                    <span data-line className="block italic text-rambla-gold-soft">
                                        destino.
                                    </span>
                                </span>
                            </h2>
                        </div>

                        <p data-contact-fade className="mt-8 max-w-md text-base font-light leading-relaxed text-rambla-cream/70 md:text-lg">
                            Preencha o formulário e um de nossos especialistas em design de viagens entrará em contato para entender seus desejos.
                        </p>

                        <ul className="mt-12 border-t border-rambla-cream/10">
                            {channels.map((channel) => (
                                <li key={channel.label} data-contact-fade className="border-b border-rambla-cream/10">
                                    <a
                                        href={channel.href}
                                        {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                        className="group/roll flex items-center justify-between gap-6 py-5"
                                    >
                                        <span className="eyebrow text-[9px] text-rambla-cream/45">{channel.label}</span>
                                        <span className="flex items-center gap-4 text-sm font-light transition-colors duration-500 group-hover/roll:text-rambla-gold-soft md:text-base">
                                            <RollText>{channel.value}</RollText>
                                            <Arrow className="h-3 w-3 transition-transform duration-500 group-hover/roll:rotate-45" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-12 scheme-dark">
                        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register('website')} />

                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
                            <div data-field className="field">
                                <label htmlFor="contact-name" className="field-label">
                                    Nome completo
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Como prefere ser chamado?"
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                    aria-describedby={describedBy('name')}
                                    className="field-input"
                                    {...register('name')}
                                />
                                <span className="field-line" />
                                {errorFor('name')}
                            </div>
                            <div data-field className="field">
                                <label htmlFor="contact-email" className="field-label">
                                    E-mail
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="seu.melhor@email.com"
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                    aria-describedby={describedBy('email')}
                                    className="field-input"
                                    {...register('email')}
                                />
                                <span className="field-line" />
                                {errorFor('email')}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
                            <div data-field className="field">
                                <label htmlFor="contact-phone" className="field-label">
                                    Telefone / WhatsApp
                                </label>
                                <input
                                    id="contact-phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="(00) 00000-0000"
                                    aria-invalid={errors.phone ? 'true' : 'false'}
                                    aria-describedby={describedBy('phone')}
                                    className="field-input"
                                    {...register('phone')}
                                />
                                <span className="field-line" />
                                {errorFor('phone')}
                            </div>
                            <div data-field className="field">
                                <label htmlFor="contact-service" className="field-label">
                                    Serviço desejado
                                </label>
                                <div className="relative">
                                    <select
                                        id="contact-service"
                                        aria-invalid={errors.service ? 'true' : 'false'}
                                        aria-describedby={describedBy('service')}
                                        className="field-input cursor-pointer appearance-none pr-8"
                                        defaultValue=""
                                        {...register('service')}
                                    >
                                        <option value="" disabled>
                                            Selecione uma opção
                                        </option>
                                        {Object.entries(serviceLabels).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                    <svg
                                        viewBox="0 0 12 12"
                                        className="pointer-events-none absolute right-1 top-2 h-3 w-3 text-rambla-gold-soft"
                                        fill="none"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M2 4.5L6 8.5L10 4.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="field-line" />
                                </div>
                                {errorFor('service')}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
                            <div data-field="destination" className="field -mx-3 rounded-sm px-3 pt-2">
                                <label htmlFor="contact-destination" className="field-label">
                                    Destino dos sonhos
                                </label>
                                <input
                                    id="contact-destination"
                                    type="text"
                                    placeholder="Ex: Paris, Maldivas, Nordeste..."
                                    aria-invalid={errors.destination ? 'true' : 'false'}
                                    aria-describedby={describedBy('destination')}
                                    className="field-input"
                                    {...register('destination')}
                                />
                                <span className="field-line" />
                                {errorFor('destination')}
                            </div>
                            <div data-field className="field md:pt-2">
                                <label htmlFor="contact-travel-date" className="field-label">
                                    Data prevista
                                </label>
                                <input
                                    id="contact-travel-date"
                                    type="month"
                                    aria-invalid={errors.travelDate ? 'true' : 'false'}
                                    aria-describedby={describedBy('travelDate')}
                                    className="field-input uppercase"
                                    {...register('travelDate')}
                                />
                                <span className="field-line" />
                                {errorFor('travelDate')}
                            </div>
                        </div>

                        <div data-field className="field">
                            <label htmlFor="contact-details" className="field-label">
                                Detalhes da viagem
                            </label>
                            <textarea
                                id="contact-details"
                                rows={4}
                                placeholder="Conte-nos um pouco sobre a viagem dos seus sonhos, número de pessoas, preferências..."
                                aria-invalid={errors.details ? 'true' : 'false'}
                                aria-describedby={describedBy('details')}
                                className="field-input resize-none"
                                {...register('details')}
                            ></textarea>
                            <span className="field-line" />
                            {errorFor('details')}
                        </div>

                        {formMessage && (
                            <p
                                role="status"
                                className={`flex items-start gap-3 text-sm ${formMessage.type === 'success' ? 'text-rambla-gold-soft' : 'text-[#e3a49a]'}`}
                            >
                                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                                {formMessage.text}
                            </p>
                        )}

                        <div data-field className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="max-w-xs text-xs font-light leading-relaxed text-rambla-cream/45">
                                Retornamos o seu contato o mais breve possível, com toda a atenção que a sua viagem merece.
                            </p>
                            <Magnetic strength={0.2}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group/roll group/btn relative inline-flex w-full items-center justify-between gap-6 overflow-hidden rounded-full bg-rambla-gold py-2 pl-8 pr-2 text-rambla-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                                >
                                    <span className="absolute inset-0 translate-y-full rounded-full bg-rambla-cream transition-transform duration-700 ease-out-expo group-hover/btn:translate-y-0 group-disabled/btn:hidden" />
                                    <span className="eyebrow relative text-[10px]">
                                        <RollText>{isSubmitting ? 'Enviando...' : 'Enviar solicitação'}</RollText>
                                    </span>
                                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-rambla-dark text-rambla-cream">
                                        {isSubmitting ? (
                                            <span className="h-3.5 w-3.5 animate-spin rounded-full border border-rambla-cream/30 border-t-rambla-cream" />
                                        ) : (
                                            <Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-45" />
                                        )}
                                    </span>
                                </button>
                            </Magnetic>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
