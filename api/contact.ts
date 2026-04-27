import { Resend } from 'resend';
import { contactFormSchema, serviceLabels } from '../src/lib/contactForm.js';
import type { ContactFormData } from '../src/lib/contactForm.js';

declare const process: {
  env: Record<string, string | undefined>;
};

const contactToEmail = process.env.CONTACT_TO_EMAIL ?? 'contato@ramblaviagens.com.br';
const resendFromEmail = process.env.RESEND_FROM_EMAIL ?? 'Rambla Viagens <contato@ramblaviagens.com.br>';

type ContactResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const jsonResponse = (body: ContactResponse, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const formatOptional = (value?: string) => (value ? value : 'Não informado');

const buildEmailText = (data: ContactFormData) => [
  'Nova solicitação pelo site da Rambla Viagens',
  '',
  `Nome: ${data.name}`,
  `E-mail: ${data.email}`,
  `Telefone / WhatsApp: ${data.phone}`,
  `Serviço desejado: ${serviceLabels[data.service]}`,
  `Destino dos sonhos: ${formatOptional(data.destination)}`,
  `Data prevista: ${formatOptional(data.travelDate)}`,
  '',
  'Detalhes da viagem:',
  data.details,
].join('\n');

const buildEmailHtml = (data: ContactFormData) => {
  const rows = [
    ['Nome', data.name],
    ['E-mail', data.email],
    ['Telefone / WhatsApp', data.phone],
    ['Serviço desejado', serviceLabels[data.service]],
    ['Destino dos sonhos', formatOptional(data.destination)],
    ['Data prevista', formatOptional(data.travelDate)],
  ];

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; color: #111; line-height: 1.6; max-width: 600px;">
      <p style="margin: 0 0 24px;"><strong>Nova solicitação pelo site da Rambla Viagens</strong></p>
      
      ${rows
        .map(
          ([label, value]) => `
            <div style="margin-bottom: 12px;">
              <span style="color: #666;">${escapeHtml(label)}</span><br>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `,
        )
        .join('')}
      
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee;">
        <span style="color: #666;">Detalhes da viagem</span><br>
        <p style="white-space: pre-line; margin: 4px 0 0;">${escapeHtml(data.details)}</p>
      </div>
    </div>
  `;
};

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, message: 'Método não permitido.' }, 405);
    }

    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ ok: false, message: 'Revise os campos destacados.' }, 400);
    }

    const result = contactFormSchema.safeParse(payload);

    if (!result.success) {
      return jsonResponse(
        {
          ok: false,
          message: 'Revise os campos destacados.',
          fieldErrors: result.error.flatten().fieldErrors,
        },
        400,
      );
    }

    const data = result.data;

    if (data.website) {
      return jsonResponse({ ok: true, message: 'Solicitação enviada com sucesso.' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY.');
      return jsonResponse({ ok: false, message: 'Não foi possível enviar sua solicitação agora.' }, 500);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: [contactToEmail],
      replyTo: data.email,
      subject: `Nova solicitação de viagem - ${data.name}`,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    });

    if (error) {
      console.error('Resend contact email failed.', error);
      return jsonResponse({ ok: false, message: 'Não foi possível enviar sua solicitação agora.' }, 502);
    }

    return jsonResponse({ ok: true, message: 'Solicitação enviada com sucesso.' });
  },
};
