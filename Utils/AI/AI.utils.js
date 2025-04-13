const axios = require('axios')

const aiGETRequest = async (req, res, next) => {
  try {
    let response = await axios.get(
      'https://das-dap-backend.herokuapp.com/Admin/Dashboard/Tasks/viewAllTaskFlow',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTdmZmEyMTIzOGZlZWNmZmU3YzZmNSIsImlhdCI6MTY1MDA5NzkwMiwiZXhwIjoxNjUwMTg0MzAyfQ.q_mehBVyMIekPHVNxNuVxIMlEVvbQeDMUa0wg0Kfm0M',
        },
      }
    )
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

const aiPOSTRequest = async (req, res, next) => {
  var data = JSON.stringify({
    applicationName: 'test1',
    applicationURL: 'www.testharoon.com',
    taskFlowUseCase: 'send mail',
    taskList: [
      {
        stepNumber: 1,
        id: 'test1',
        className: 'testClass',
        taskMessage: 'Click on create button',
        // _id: '624d6c1cae6f0511b790665d',
      },
      {
        stepNumber: 2,
        id: 'test2',
        className: 'testClass',
        taskMessage: 'inside the input field start typing',
        // _id: '624d6c1cae6f0511b790665e',
      },
    ],
  })

  var config = {
    method: 'post',
    url: 'https://das-dap-backend.herokuapp.com/Extension/Dashboard/Tasks/createTaskFlow',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTdmZmEyMTIzOGZlZWNmZmU3YzZmNSIsImlhdCI6MTY1MDA5NzkwMiwiZXhwIjoxNjUwMTg0MzAyfQ.q_mehBVyMIekPHVNxNuVxIMlEVvbQeDMUa0wg0Kfm0M',
      'Content-Type': 'application/json',
    },
    data: data,
  }

  try {
    let response = await axios(config)
    console.log(response.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

aiGETRequest()
aiPOSTRequest()

// module.exports = {
//   aiGETRequest,
//   aiPOSTRequest,
// }
