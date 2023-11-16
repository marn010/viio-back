import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const products = readJSON('./products.json')
const users = readJSON('./users.json')

export class ProductModel {
  static getAll = async ({ genre }) => {
    if (genre) {
        return products.filter(
          product => product.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )}
      return products
  }

  static async getById ({id}) {
    const product = products.find(product => product.id === id)
    return product
  }

  static async create ({input}) {
    const newProduct = {
      id: randomUUID(), // uuid v4
      ...input
    }

    products.push(newProduct)

    return newProduct
  }
  static async delete ({ id }) {
    const productIndex = products.findIndex(product => product.id === id )
    if (productIndex === -1) return false

    products.splice(productIndex, 1)
    return true
  }
  
  static async update ({ id, input }){
    const productIndex = products.findIndex(product => product.id === id )
    if (productIndex === -1) return false

    products[productIndex]= {
      ...products[productIndex],
      ...input
    }

    return products[productIndex]
  }
}
export class UserModel{
  static getAll = async ({ id }) => {
    if (id) {
      return users.filter(
        user => user.id.some(g => g === id)
      )
    }
    return users
  }
  static async createUser ({input}) {
    const newUser = {
      id: randomUUID(),
      ...input
    }

    users.push(newUser)

    return newUser
  }
  static getById = async({ id }) =>{
    const user = users.find(user => user.id === id)
    return user
  }
}
