import express, { json } from 'express'
import { createProductRouter, createUserRouter } from './routes/products.js'
import { corsMiddleware } from './middlewares/cors.js'

import 'dotenv/config'

export const createApp =({ productModel,userModel }) =>{
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  
  app.use('/products', createProductRouter({ productModel }))
  //app.use('/signup', createProductRouter({ productModel }))
  app.use('/signup', createUserRouter({userModel}))
  
  const PORT = process.env.PORT ?? 1234
  
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

}
