const queryFields = {
  users: ['email', 'page', 'userID', 'userName', 'seach'],
  taskFlows: [
    'limit',
    'page',
    'applicationTaskFlowUseCase',
    'applicationDomain',
  ],
  announcement: ['limit', 'page', 'search', 'announcementId', 'userId'],
  feedback: [
    'limit',
    'page',
    'search',
    'id',
    'type',
    'brand',
    'model',
    'manufacturerSpid',
  ],
}

const queryValidator = async (req, res, next) => {}
