
const mongoose = require('mongoose')
const { Schema } = mongoose

// const feedBackSchema = new Schema(
//   {
//     feedbackCreatorName: {
//       type: String,
//     },
//     feedbackQuestions: [
//       {
//         feedbackQuestion: {
//           type: String,
//         },
//         feedbackQuestionType: {
//           type: String,
//         },
//         feedbackQuestionOptions: [
//           {
//             text: {
//               type: String,
//             },
//             image: {
//               type: String,
//             },
//           },
//         ],
//         feedbackQuestionImage: {
//           type: String,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// )

const feedBackSchema = new Schema({
  email: {
          type: String,
        },
  feedbackQuery:{
    type:String
  },
  rating:{
    type:Number
  }

},{
  timestamps: true,
})


module.exports = feedBackSchema
