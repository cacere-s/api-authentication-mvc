import { Op } from 'sequelize'
import sendEmail from '../../helpers/email.js'
import { tokenJWT } from '../../helpers/token.js'
import database from './config/db.js'
import User from './models/User.js'

try {
  await database.authenticate()
  database.sync()
  console.log('connected database')
} catch (e) {
  throw new Error('Error connecting database')
}

export default class UserModel {
  static async register ({ input, token }) {
    const { name, lastName, userName, email } = input

    const existEmail = await User.findOne({ where: { email } })
    if (existEmail) return { error: true, message: 'Email already registered' }

    const newUser = await User.create({
      ...input,
      token
    })

    // enviar correo para confirmar cuenta
    await sendEmail({ name, lastName, userName, email, token })

    return { error: false, message: 'Check your email to verify your account', newUser }
  }

  static async confirmation ({ token }) {
    const user = await User.findOne({ where: { token } })

    if (!user) {
      return { error: true, message: 'User not found', data: null }
    }
    user.confirmed = true
    user.token = null
    await user.save()
    return { error: false, message: 'Confirmed user', data: user }
  }

  static async login ({ userEmail, password }) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { userName: userEmail },
          { email: userEmail }
        ]
      }
    })

    if (!user) return { error: true, status: 404, message: 'User not found' }
    if (!user.confirmed) return { error: true, status: 401, message: 'Confirm user email' }
    if (!user.verifyPassword(password)) return { error: true, status: 404, message: 'Incorrect credentials' }

    // generar token JWT
    const jwt = tokenJWT({ id: user.id, username: user.username })

    return { error: false, message: 'Successful login', token: jwt }
  }
}
