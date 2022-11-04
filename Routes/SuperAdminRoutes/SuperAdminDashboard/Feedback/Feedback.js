const Express = require("express");
const { createSuperAdminFeedBack, getSuperAdminFeedBack, updateSuperAdminFeedBack, deleteSuperAdminFeedBack } = require("../../../../Utils/FeedBack/feedback.utils");
const Router = Express.Router();

Router.post('/',createSuperAdminFeedBack);
Router.get('/',getSuperAdminFeedBack);
Router.put('/:id',updateSuperAdminFeedBack);
Router.delete('/:id',deleteSuperAdminFeedBack);

module.exports = Router