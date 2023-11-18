import express, { json } from 'express'
import { createUserRouter, dataRouter, loginUserRouter } from './routes/products.js'
import { corsMiddleware } from './middlewares/cors.js'

import 'dotenv/config'

export const createApp =({ userModel,loginModel,dataModel }) =>{
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  
  app.use('/signup', createUserRouter({userModel}))
  app.use('/login', loginUserRouter({loginModel}))
  app.use('/data', dataRouter({dataModel}))
  
  const PORT = process.env.PORT ?? 1234
  
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

}
