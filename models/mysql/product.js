import { response } from 'express'
import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'inuyasha010',
  database: 'signup'
}
const connectionString = DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class UserModel{
  static async getAll ({ id }) {
    const [users] = await connection.query(
      'SELECT id, name, email FROM users '
    )
    if (users.length===0) {
      return 
    } else {
      return users
    }
  }
  static async getById ({ id }) {
    const [users] = await connection.query(
      `SELECT id, name, email FROM users WHERE id = ?;`,[id]
    )

    if (users.length === 0) return null

    return users[0]
  }
  static async createUser ({ input }) {
    const {
      name,
      email,
      password
    } = input
    try{
      const [validateUser] = await connection.query(
        `SELECT name FROM users WHERE name = ?;`,[name]
      )
      console.log("validate:",validateUser);
      if(validateUser.length>0){
        throw new Error("Username already exists")
      }
      
    }catch (e){
        //console.log(e.name + " " + e.message)
        return e.message
    }


    try{
      const newUser = await connection.query(
        `INSERT INTO users (name, email, password) VALUES (?,?,?);`,[name, email, password]
      )
      
    } catch (e) {
      
      console.log("Fallo");
      //throw new Error('Error creating user')
      //console.log(e.name+" "+ e.message);
    }
    const [users] = await connection.query(
      `SELECT name, email, password, id FROM users WHERE name = ? and email= ?;`,[name,email]
    )
    return users[0]
  }
  
}
export class LoginModel{
  static async getUser ({ input }) {
    const{
      email,
      password
    } = input

    const [user] = await connection.query(
      `SELECT email, password FROM users WHERE email = ? AND password = ?;`,[email,password]
    )
    if (user.length ==0){
      return null
    }
    return user
  }
  static async getUserByName ({email}){
    const [user] = await connection.query(
      `SELECT email, password,name FROM users WHERE email = ?;`,[email]
    )
    if (user.length==0){
      return null
    }
    return user[0]
  }
}
export class DataModel{
  static async getData({}){
  const data =await fetch("https://dummyjson.com/carts")
    //.then(response => response.json())
    //console.log("envio");
    return data.json()
  }
}