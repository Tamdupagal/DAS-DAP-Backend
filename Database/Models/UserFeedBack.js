const mongoose = require('mongoose')
const { Schema } = mongoose

const UserFeedBack  = new Schema(
{
 userEmail:{
    type:String
 },
 userQuery:{
    type:String
 },
 userQueryDescription:{
    type:String
 }

},
{
    timestamps: true,
}
)


module.exports = UserFeedBack