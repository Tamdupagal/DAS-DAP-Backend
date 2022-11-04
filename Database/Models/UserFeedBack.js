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
 userQueryDescription:[{
    email:{type:String,default:'',unique:true},
    description:{type:String,default:''},
    rating:{type:Number,default:0},
    isFeedback:{type:Boolean,default:false}
}],

},
{
    timestamps: true,
}
)


UserFeedBack.index(
   {
      userQuery: "text",
   }
 )


module.exports = UserFeedBack