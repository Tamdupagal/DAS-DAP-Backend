const Express = require("express");
const {
  getAllUpdates,
  getAllQuery,
  deleteQuery,
  postQuery,
  getLatestQuery,
} = require("../../../../Utils/Updates/Updates.utils");
const {
  createUser,
  fetchUser,
  updateUser,
  fetchMyUsers,
  postChat,
  getChat,
  createGroup,
  sendGroupChat,
  getGroupChat,
  newMember,
  removeMembers,
  deleteGroup,
  deleteMessage,
  deleteGroupMessage,
  getMyProfile,
  getLatestMessage,
  getLatestGroupMessage,
  deleteUser,
  createChecklist,
  fetchCheckList,
  // viewChecklists,
  updateChecklist,
  fetchNewestChecklistForUser,
  // submitAnnouncementResponse,
} = require("../../../../Utils/Users/Users.utils");
const {
  userCreationValidation,
} = require("../../../../Validators/UserCreationValidation");
const Router = Express.Router();

Router.route("/").post([userCreationValidation, createUser]);
Router.route("/search?").get(fetchUser);
Router.route("/myUsers?").get(fetchMyUsers);
Router.route("/updateUser").put(updateUser);
Router.route("/myProfile").get(getMyProfile);
Router.route("/deleteUser/:email").delete(deleteUser);
Router.route("/checkList").post(createChecklist);
Router.route("/getchecklist").get(fetchCheckList);
Router.route("/getchecklistone").get(fetchNewestChecklistForUser);
Router.route("/updateChecklist/:id").put(updateChecklist);
// Router.route("/checklistSubmit").post(submitAnnouncementResponse);

//get Updates
Router.route("/myUpdates").get(getAllUpdates);

// one on one chat routes
Router.route("/postChat").put(postChat);
Router.route("/getChat").get(getChat);
Router.route("/deleteMessage").put(deleteMessage);
Router.route("/latestMessage").put(getLatestMessage);

// group chat routes
Router.route("/groupChat").post(createGroup);
Router.route("/groupChat").put(sendGroupChat);
Router.route("/groupChat").get(getGroupChat);
Router.route("/groupChat/deleteGroup").put(deleteGroup);
Router.route("/newMembers").put(newMember);
Router.route("/removeMembers").put(removeMembers);
Router.route("/groupChat/deleteMessage").put(deleteGroupMessage);
Router.route("/groupChat/latestMessage").put(getLatestGroupMessage);

//Admin Query Routes
Router.route("/myQuery/getChat").get(getAllQuery);
Router.route("/myQuery/postChat").put(postQuery);
Router.route("/myQuery/deleteMessage").put(deleteQuery);
Router.route("/myQuery/latestMessage?").get(getLatestQuery);
module.exports = Router;
