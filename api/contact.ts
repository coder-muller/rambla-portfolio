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
    <div style="font-family: Arial, sans-serif; color: #1d324b; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 20px;">Nova solicitação pelo site da Rambla Viagens</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 10px 12px; border: 1px solid #e7e0d6; font-weight: 700; width: 180px;">${escapeHtml(label)}</td>
                  <td style="padding: 10px 12px; border: 1px solid #e7e0d6;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
      <h2 style="font-size: 16px; margin: 24px 0 8px;">Detalhes da viagem</h2>
      <p style="white-space: pre-line; margin: 0;">${escapeHtml(data.details)}</p>
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
