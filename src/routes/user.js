import { Router } from 'express'
import UserController from '../controller/user.js'

export default function userRouter ({ UserModel }) {
  const router = Router()

  const userController = new UserController({ UserModel })

  router.post('/register', userController.register)
  router.post('/confirmation/:token', userController.confirmation)
  router.post('/auth/login', userController.login)

  return router
}
