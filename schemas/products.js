import z from 'zod'

const productSchema = z.object({
  title: z.string({
    invalid_type_error: 'Product title must be a string',
    required_error: 'Product title is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action','Adventure','Crime','Comedy','Drama','Fantasy','Horror','Thriller','Sci-Fi',]),
    {
      required_error: 'Product genre is required.',
      invalid_type_error: 'Product genre must be an array of enum Genre'
    }
  )
})
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