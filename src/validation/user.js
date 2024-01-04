import z from 'zod'

const REGEX = {
  USERNAME: /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/gm,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm
}

const userSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name is required'
  }),

  lastName: z.string({
    invalid_type_error: 'last name must be a string',
    required_error: 'last name is required'
  }),

  userName: z.string({
    invalid_type_error: 'user name must be a string',
    required_error: 'user name is required'
  }).regex(new RegExp(REGEX.USERNAME), { message: 'invalid username ' }),

  email: z.string().email(),

  password: z.string().regex(new RegExp(REGEX.PASSWORD), { message: 'invalid password ' })
})

export function userValidation (input) {
  return userSchema.safeParse(input)
}

export function userValidationPartial (input) {
  return userSchema.partial().safeParse(input)
}
