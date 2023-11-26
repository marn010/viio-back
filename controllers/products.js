
import { validateUser, validateLogin} from '../schemas/products.js'
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import * as config from '../config/auth.config.js'

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
    console.log("new: ",newUser);
    if(newUser.name){
      res.status(200).json(newUser)
    }else{
      res.status(400).json(newUser)
    }
    
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