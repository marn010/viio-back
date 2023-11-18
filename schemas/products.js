import z from 'zod'


const userSchema = z.object({
  name: z.string({
    invalid_type_error: 'User name must be a string',
    required_error: 'User name is required'
  }),
  email: z.string().email({ 
    message: "Invalid email address" 
  }),
  password: z.string({
    required_error: 'User password is required'
  }).min(6,{message: "Must be 6 character long"})
  })
const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address"
  }),
  password: z.string({
    required_error: 'User password is required'
  })
})

export function validateProduct(object) {
  return productSchema.safeParse(object)
}

export function validatePartialProduct (object){
  return productSchema.partial().safeParse(object)
}

export function validateUser(object){
  return userSchema.safeParse(object)
}
export function validateLogin(object){
  return loginSchema.safeParse(object)
}