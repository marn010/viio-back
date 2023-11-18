
import { validateProduct, validatePartialProduct, validateUser, validateLogin} from '../schemas/products.js'
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import * as config from '../config/auth.config.js'
export class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const Products = await this.productModel.getAll({ genre })
    res.json(Products)
  }
  getById = async (req, res) => {
  const { id } = req.params
  const product = await this.productModel.getById({ id })
  if (product) return res.json(product)

  res.status(404).json({ message: 'Product not found'})
  }
  create = async (req, res) => {
    const result = validateProduct(req.body)
  
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newProduct = await this.productModel.create({input: result.data})
    res.status(201).json(newProduct) // actualizar la caché del cliente
  }

  createUser = async (req,res) =>{
    const result = validateUser(req.body)
    if (result.error){
      return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    const newUser = await this.productModel.createUser({input: result.data})

    res.status(201).json(newUser)
  }
  delete = async (req, res) => {
    const { id } = req.params
    
    const result = this.productModel.delete({ id })
  
    if (result === false){
      (404).json({ message: 'Product not found'})
    }
  
    return res.json({ message: 'Product deleted'})
  }
  update = async (req,res) => {
    const result = validatePartialProduct(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    const { id } = req.params
    
    const updatedProduct = await this.productModel.update({ id, input: result.data })
    
    return res.json(updatedProduct)
  }
}
export class UserController {
  constructor ({userModel}){
    this.userModel = userModel;
  }
  getAll = async (req,res) =>{
    const { id } = req.query
    const Users = await this.userModel.getAll({ id })
    res.json(Users)
  }
  create = async (req,res) => {
    const result = validateUser(req.body) 
    if (result.error){
      return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    result.data.password = bcrypt.hashSync(result.data.password,8)
    const newUser = await this.userModel.createUser({input: result.data})
    res.status(201).json(newUser)
  }
  getById = async (req,res) =>{
    const { id } = req.params
    const user = await this.userModel.getById({ id })
    if (user) return res.json(user)

    res.status(404).json({ message: 'User not found'})
  }
}
export class LoginController {
  constructor ({loginModel}){
    this.loginModel = loginModel
  }
  getUser = async (req,res) =>{
    const result = validateLogin(req.body)
    if (result.error){
      return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    //result.data.password= bcrypt.hashSync(result.data.password,8)
    const user = await this.loginModel.getUserByName({ email: result.data.email})
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Email or Password!"
      });
    }
    const token = jwt.sign({ id: user.id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                            });
    return res.status(200).json({
      name: user.name,
      email: user.email,
      accessToken: token,
    })
    //const User = await this.loginModel.getUser({ input: result.data})
    //if (User) return res.status(201).json(User)

    //return res.status(404).json({ message: 'User not found'})
  }
}
export class DataController {
  constructor ({dataModel}){
    this.dataModel = dataModel
  }
  getData = async (req,res) =>{
    const { input } = req.query
    const Products = await this.dataModel.getData({input})
    res.json(Products)
  }
}