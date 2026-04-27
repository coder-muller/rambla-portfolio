import { z } from 'zod';

export const serviceLabels = {
  roteiro: 'Roteiro Personalizado',
  passagens: 'Passagens Aéreas',
  hoteis: 'Reserva de Hotéis',
  grupo: 'Viagem em Grupo',
  completo: 'Pacote Completo',
  outros: 'Outros',
} as const;

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

export const contactFormSchema = z.object({
  name: z
    .string({ error: 'Informe seu nome completo.' })
    .trim()
    .min(2, 'Informe seu nome completo.'),
  email: z
    .string({ error: 'Informe um e-mail válido.' })
    .trim()
    .email('Informe um e-mail válido.'),
  phone: z
    .string({ error: 'Informe um telefone ou WhatsApp válido.' })
    .trim()
    .regex(/^\+?[0-9\s().-]{10,20}$/, 'Informe um telefone ou WhatsApp válido.'),
  service: z.enum(Object.keys(serviceLabels) as [keyof typeof serviceLabels, ...Array<keyof typeof serviceLabels>], {
    error: 'Selecione o serviço desejado.',
  }),
  destination: optionalText,
  travelDate: optionalText,
  details: z
    .string({ error: 'Conte um pouco mais sobre a viagem.' })
    .trim()
    .min(10, 'Conte um pouco mais sobre a viagem.'),
  website: optionalText,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactFormValues = z.input<typeof contactFormSchema>;
