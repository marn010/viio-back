import { Router } from "express";

import { ProductController } from "../controllers/products.js";
import { UserController } from "../controllers/products.js";

export const createProductRouter = ({ productModel }) =>{
  const productsRouter = Router()
  
  const productController = new ProductController({ productModel})
  
  productsRouter.get('/',productController.getAll)
  productsRouter.post('/', productController.create)
  
  productsRouter.get('/:id', productController.getById)
  productsRouter.delete('/:id', productController.delete)
  productsRouter.patch('/:id', productController.update)

  return productsRouter
}

export const createUserRouter= ({userModel}) =>{
  const userRouter = Router()

  const userController = new UserController({userModel})

  userRouter.get('/', userController.getAll)
  userRouter.post('/', userController.create)

  userRouter.get('/:id', userController.getById)


  return userRouter
}