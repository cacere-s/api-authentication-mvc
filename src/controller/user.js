import { generateId } from '../helpers/token.js'
import { loginValidation } from '../validation/login.js'
import { userValidation } from '../validation/user.js'

export default class UserController {
  constructor ({ UserModel }) {
    this.UserModel = UserModel
  }

  register = async (req, res) => {
    const validationResult = userValidation(req.body)

    if (!validationResult.success) return res.status(406).json({ message: validationResult.error })

    const accessToken = generateId()
    const newUser = await this.UserModel.register({ input: validationResult.data, token: accessToken })

    if (newUser.error) return res.status(302).json(newUser)
    return res.status(201).json(newUser)
  }

  confirmation = async (req, res) => {
    const { token } = req.params
    const user = await this.UserModel.confirmation({ token })

    if (user.error) return res.status(404).json(user)

    return res.status(200).json(user)
  }

  login = async (req, res) => {
    const { userEmail, password } = req.body

    const validationLogin = loginValidation(req.body)
    if (!validationLogin.success) return res.status(406).json({ message: validationLogin.error })

    const login = await this.UserModel.login({ userEmail, password })
    if (login.error) return res.status(login.status).json({ message: login.message })

    return res.status(200).json(login)
  }
}
