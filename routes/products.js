import { Router } from "express";

import { ProductController } from "../controllers/products.js";
import { UserController } from "../controllers/products.js";
import { LoginController } from '../controllers/products.js';
import { DataController } from '../controllers/products.js';


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
export const loginUserRouter= ({ loginModel}) =>{
  const loginRouter = Router()

  const loginController = new LoginController({loginModel})

  loginRouter.post('/', loginController.getUser)
  //loginRouter.post('/', loginController.getUserByName)

  return loginRouter
}
export const dataRouter = ({ dataModel})=>{
  const dataRouter = Router()

  const dataController = new DataController({dataModel})

  dataRouter.get('/', dataController.getData)
  return dataRouter
}