const Schema = require('mongoose').Schema
const AnnouncementSchema = new Schema(
  {
    announcementCreatorName: {
      type: String,
    },
    announcementDate: {
      type: String,
      // required: true,
    },
    announcementTime:{
     type:String
    },
    announcementTitle: {
      type: String,
      // required: true,
    },
    announcementBody: {
      type: String,
    },
    announcementAttachment: {
      type: String,
    },
    allUsers:[{
     email:{type:String},
     isAnnouncement:{type:Boolean,default:true}
    }],
    announcementReceivers: [
      {
        email: {
          type: String,
        },
        userName: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = AnnouncementSchema
