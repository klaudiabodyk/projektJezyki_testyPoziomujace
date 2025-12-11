import nodemailer from 'nodemailer'

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN ?? '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '')

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: 'OK' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method not allowed' }
  }

  let payload
  try {
    payload = JSON.parse(event.body ?? '{}')
  } catch (error) {
    console.error('Invalid JSON body', error)
    return { statusCode: 400, headers: corsHeaders, body: 'Invalid JSON body' }
  }

  const { correct, total, missing, percent, userEmail, level, language } = payload || {}

  if (!isEmailValid(userEmail)) {
    return { statusCode: 400, headers: corsHeaders, body: 'Niepoprawny adres e-mail.' }
  }

  if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: 'Brak konfiguracji SMTP (MAIL_HOST, MAIL_USER, MAIL_PASS).',
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    const to = process.env.MAIL_TO ?? 'kontakt@joannaadamek.edu.pl'
    const from = process.env.MAIL_FROM ?? process.env.MAIL_USER
    const subject = process.env.MAIL_SUBJECT ?? 'Wynik testu poziomującego'

    const computedPercent =
      typeof percent === 'number' ? percent : Math.round(((correct ?? 0) / (total || 1)) * 100)

    const lines = [
      `Wynik: ${correct}/${total} (${computedPercent}%)`,
      `Nieodpowiedziane: ${missing}`,
      `Poziom: ${level ?? '-'}`,
      `Język: ${language ?? '-'}`,
      `Email uczestnika: ${userEmail}`,
    ]

    await transporter.sendMail({
      from,
      to,
      subject,
      text: lines.join('\n'),
    })

    return { statusCode: 200, headers: corsHeaders, body: 'OK' }
  } catch (error) {
    console.error('Mail send error', error)
    return { statusCode: 500, headers: corsHeaders, body: 'Serwer nie może teraz wysłać e-maila.' }
  }
}
