import { Schema, Model } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

import IUser from '../../interfaces/entities/IUser'
import passwordCredentialService from '../../services/password'
import commentService from '../../services/comment'
import historyService from '../../services/history'
import followService from '../../services/follow'
import rateService from '../../services/rate'

dotenv.config()

const UPLOADS_USER_PATH = process.env.UPLOADS_USER_PATH as string
const USER_AVATAR_DEFAULT = process.env.USER_AVATAR_DEFAULT as string

const userSchema = new Schema<IUser, Model<IUser>>({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  avatar: {
    type: String,
    default: path.join(UPLOADS_USER_PATH, USER_AVATAR_DEFAULT),
    required: true
  },
  provider: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
})

// Middlewares
userSchema.pre('findOneAndDelete', { document: false, query: true }, async function (next) {
  const userId = this.getFilter()._id
  const session = this.getOptions().session

  try {
    await passwordCredentialService.findByUserIdAndDelete(userId, session)
    await commentService.findByUserIdAndDelete(userId, session)
    await historyService.findByUserIdAndDelete(userId, session)
    await followService.findByUserIdAndDelete(userId, session)
    await rateService.findByUserIdAndDelete(userId, session)
  } catch (error: any) {
    return next(error)
  }
})

export default userSchema