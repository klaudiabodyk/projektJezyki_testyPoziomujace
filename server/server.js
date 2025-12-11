import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN ?? '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.post('/api/send-result', async (req, res) => {
  const { correct, total, missing, percent, userEmail } = req.body || {}

  if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    return res.status(400).send('Niepoprawny adres e-mail.')
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

    await transporter.sendMail({
      from,
      to,
      subject,
      text: `Wynik: ${correct}/${total} (${percent}%)\nNieodpowiedziane: ${missing}\nEmail uczestnika: ${userEmail}`,
    })

    res.status(200).send('OK')
  } catch (error) {
    console.error('Mail send error', error)
    res.status(500).send('Serwer nie może teraz wysłać e-maila.')
  }
})

app.listen(port, () => {
  console.log(`Mail server listening on http://localhost:${port}`)
})
