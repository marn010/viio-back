import { Router } from "express";


import { UserController } from "../controllers/products.js";
import { LoginController } from '../controllers/products.js';
import { DataController } from '../controllers/products.js';


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