import { Resend } from 'resend'
import { config } from 'dotenv'

config({ path: '.env' })

const resend = new Resend(process.env.RESEND)

export default async function sendEmail ({ name, lastName, userName, email, token }) {
  await resend.emails.send({
    from: 'example@example.com',
    to: email,
    subject: 'Verify Account',
    html: `
    <h3>Welcome ${userName}</h3>
    <P>We are glad that you have registered dear ${name} ${lastName}, 
    to start exploring the application. Please confirm your email address</p>
    <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/confirmation/${token}">Confirmar cuenta</a>
    `
  })
}
