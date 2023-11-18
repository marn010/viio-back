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

export class ProductModel {
  static async getAll ({ id }) {

    if (id) {
      
      // get genre ids from database table using genre names
      const [ids] = await connection.query(
        'SELECT id, name FROM users WHERE LOWER(name) = ?;',
        [id]
      )

      // no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      return []
    }

    const [users] = await connection.query(
      'SELECT id, name, email, BIN_TO_UUID(id) id FROM users;'
    )

    return users
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
      name,
      email,
      password
    } = input

    // todo: crear la conexión de genre

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO users (id, name, email, password)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?);`,
        [name, email, password]
      )
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error creating user')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [users] = await connection.query(
      `SELECT name, email, password, BIN_TO_UUID(id) id
        FROM users WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return users[0]
  }

}
export class UserModel{
  static async getAll ({ id }) {
    const [users] = await connection.query(
      'SELECT id, name, email FROM users '
    )
    return users
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

    const[uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid}] = uuidResult

    try{
      await connection.query(
        `INSERT INTO users (name, email, password) VALUES (?,?,?);`,[name, email, password]
      )
    } catch (e) {
      throw new Error('Error creating user')
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