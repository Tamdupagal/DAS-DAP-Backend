const Express = require("express");
const { createSuperAdminAnnouncement, getAllSuperAdminAnnouncement, getCurrentSuperAdminAnnouncement, updateSuperAdminAnnouncement, deleteSuperAdminAnnouncement } = require("../../../../Utils/Announcements/announcements.utils");
const { announcementSchemaValidation } = require("../../../../Validators/AnnouncementValidation");
const Router = Express.Router();



Router.post('/',[announcementSchemaValidation,createSuperAdminAnnouncement]);

Router.get('/',getAllSuperAdminAnnouncement);
Router.put('/updateAnnouncement/:id',updateSuperAdminAnnouncement)
Router.delete('/deleteAnnouncement/:id',deleteSuperAdminAnnouncement)

Router.get('/currentAnnouncement',getCurrentSuperAdminAnnouncement)


module.exports = Router
