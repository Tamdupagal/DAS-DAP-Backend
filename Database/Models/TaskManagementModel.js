const mongoose = require("mongoose");

const Schema = require('mongoose').Schema

const TaskManagementModel = new Schema({
title:{
    type:String
},
description:{
    type:String
},
list:{
    type:String,
    enum:{
        values:["Backlog","Done","Doing","Staging"],
        message:"Please Select Valid list Value"
    }
},
priorities:{
    type:String,
    enum:{
        values:["Urgent","High","Medium","Low","Lowest"],
        message:"Please Select Valid Priorities Value"
    }
},
assignedBy:{
    type:mongoose.Schema.ObjectId,
    ref: "User",
},
assignedTo:[{type:mongoose.Schema.ObjectId,ref:"User"}],

label:{
    type:Array
},
startDate:{
    type:Date,
    default:Date.now()
},
endDate:{
    type:Date,
},
checkList:[{listItem: {type:String},isChecked:{type:Boolean}}],
isStarred:{
    type:Boolean,
    default:false
},
starred:[{userId:{
    type:mongoose.Schema.ObjectId
},isStarred:{
    type:Boolean,
}}]
})

module.exports = TaskManagementModel