const mongoose = require('mongoose')
const { Schema } = mongoose

const UserFeedBack  = new Schema(
{
 userEmail:{
    type:String
 },
 userQuery:{
    type:String,
   unique: true 
 },
 userQueryDescription:{
    type:String
 },
 isFeedback:{
   type:Boolean,
   default:false
 },
 rating:{
   type:Number,
   default:0
 }

},
{
    timestamps: true,
}
)


UserFeedBack.index(
   {
      userQuery: "text",
      userQueryDescription: "text"
   }
 )


module.exports = UserFeedBack