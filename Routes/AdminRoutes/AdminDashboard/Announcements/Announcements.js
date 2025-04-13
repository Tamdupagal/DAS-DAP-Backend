const Express = require("express");
const Router = Express.Router();

const {
  createAnnouncement,
  viewAnnouncementResponse,
  viewAnnouncements,
  viewSelectedAnnouncement,
  viewAllAnnouncement,
  deleteAnnouncement,
  updateAnnouncement
} = require("../../../../Utils/Announcements/announcements.utils");
const {
  announcementSchemaValidation,
} = require("../../../../Validators/AnnouncementValidation");

Router.post("/", [announcementSchemaValidation, createAnnouncement]);
Router.delete('/deleteAnnouncement/:id',deleteAnnouncement)
Router.route("/search?").get(viewAnnouncements);
Router.route("/view?").get(viewSelectedAnnouncement);
Router.put('/updateAnnouncement/:id',updateAnnouncement)

Router.route("/viewAll?").get(viewAllAnnouncement)
Router.route("/searchResponses?").get(viewAnnouncementResponse);
module.exports = Router;
