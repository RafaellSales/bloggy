import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  const user = this

  bcrypt.hash(user.password, saltRounds, (error, hash) => {
    if (error) return next(error)

    user.password = hash
    next()
  })
})

export default model('User', UserSchema)
