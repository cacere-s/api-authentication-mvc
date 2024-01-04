import z from 'zod'

const loginSchema = z.object({
  userEmail: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name is required'
  }),

  password: z.string({
    invalid_type_error: 'last name must be a string',
    required_error: 'last name is required'
  })
})

export function loginValidation (input) {
  return loginSchema.safeParse(input)
}
