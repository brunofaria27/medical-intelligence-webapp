import { ObjectId } from 'mongodb'

export interface UserAttributes {
  _id: ObjectId
  name: string
  email: string
  password: string
  userType: string
}
