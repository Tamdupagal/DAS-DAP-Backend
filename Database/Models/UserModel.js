const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = require('mongoose').Types.ObjectId

const UserSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    typeOfUser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.statics.findUser = async function (value) {
  try {
    if (value == null) throw new Error(`Invalid ${value}`)
    const { email, userName, userID } = value
    let query = {}
    if (email) query.email = email
    if (userName) query.userName = userName
    if (userID) query._id = ObjectId(userID)
    let User = await this.findOne(query)
    if (User) return { User, isExisting: true }
    return { isExisting: false }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = UserSchema
