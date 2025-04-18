const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;
const { sendOtp } = require("../../Services/EmailServices/Email");

const {
  dependencyInjector,
} = require("../../Database/Schemas/AuthenticationDBConnection");

const createChecklist = async (req, res, next) => {
  try {
    const { name, adminId, description, members, flows, checkListReceivers } =
      req.body;

    const { CheckList } = res.locals.connection.databaseObject;

    // Create a new checklist document
    const Checklist = new CheckList({
      name,
      adminId,
      description,
      members,
      flows,
      checkListReceivers,
    });

    // Save the checklist to the database
    const createdChecklist = await Checklist.save();

    res.status(201).json({
      status: "success",
      message: "Checklist created successfully",
      data: createdChecklist,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create the checklist",
      error: error.message,
    });
  }
};

const fetchCheckList = async (req, res, next) => {
  try {
    const { CheckList } = res.locals.connection.databaseObject;
    // const { companyEmail } = req.query;
    const response = await CheckList.find();
    res
      .status(200)
      .send({ status: 200, result: response.length, data: response });
  } catch (err) {
    res.status(200).send({
      status: 400,
      message: err.message,
    });
  }
};

// const submitAnnouncementResponse = async (req, res, next) => {
//   try {
//     const { CheckListResponseSchema } = res.locals.connection.databaseObject;
//     const { checkListID } = req.query;
//     const { checkListResponse } = req.body
//     const newResponse = await CheckListResponseSchema.create({
//       checklistReferenceId: checkListID,
//       checkListResponse,
//     });
//     await newResponse.save()
//     res.status(200).send({
//       status: 200,
//       message: 'CheckList Response has been submitted!',
//     })
//   } catch (e) {
//     console.log(e.message)
//     res.status(400).send({
//       status: 400,
//       message: "CheckList Response can't be saved",
//     })
//   }
// }

const updateChecklist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { CheckList } = res.locals.connection.databaseObject;

    const { allUsers } = req.body;

    const myCheckList = await CheckList.findById(id);

    if (allUsers) {
      allUsers.map((data) => {
        myCheckList.allUsers.push(data);
      });
    }
    await myCheckList.save();

    res.status(200).send({
      status: 200,
      message: "CheckList has been Updated",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Some Error occured",
    });
  }
};


const fetchNewestChecklistForUser = async (req, res, next) => {
  try {
    const { CheckList } = res.locals.connection.databaseObject;
    // const { userId } = req.body;
    // console.log(userId);
    // Find the newest checklist where the members array includes the user ID
    // const newestChecklist = await checkList.findOne({ members: userId }).sort({
    //   createdAt: -1,
    // });
    const newestChecklist = await CheckList.find();
    const response = newestChecklist[newestChecklist.length - 1];
    console.log(newestChecklist);
    res.status(200).json({
      status: "success",
      data: response || null,
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({
      status: "error",
      message: "Failed to fetch the newest checklist",
      error: error.message,
    });
  }
};



const createUser = async (req, res) => {
  try {
    const { userName, email, password, companyEmail, typeOfUser } = req.body;

    let testCase = new RegExp(res.locals.params, "g");
    if (!testCase.test(email)) {
      throw new Error(
        "User cannot be saved due to conflict in email! please use company email."
      );
    }

    const { userModel } = res.locals.connection.databaseObject;
    const { companyUserModel } = await dependencyInjector(res.locals.params);
    let user = await userModel.findUser({ email });
    if (user.isExisting) throw new Error(`${email} already exists.`);
    let newUser = await userModel.create({
      userName: userName,
      email: email,
      password: password,
      companyEmail: companyEmail,
      typeOfUser: typeOfUser,
    });
    let newLoginUser = await companyUserModel.create({
      userName: userName,
      email: email,
      password: await bcrypt.hash(password, 10),
      typeOfUser: typeOfUser,
      companyEmail: companyEmail,
    });

    res.status(200).send({ status: 200, message: `${userName} has joined ` });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ satus: 400, message: e.message });
  }
};

// Fetch Task Flow

const fetchUser = async (req, res, next) => {
  try {
    const { userModel } = res.locals.connection.databaseObject;
    const { email, page, userId } = req.query;
    let query = {},
      pageNumber = parseInt(page),
      skip,
      limit;
    if (email) query.email = email;
    if (userId) query._id = ObjectId(userId);
    if (!pageNumber || pageNumber <= 1) {
      pageNumber = 1;
    }
    skip = pageNumber * 10 - 10;
    limit = 1000;
    let totalCount = await userModel.count();
    let result = await userModel
      .find(query, { password: 0 })
      .skip(skip)
      .limit(limit);
    res.status(200).send({ status: 200, result, totalCount });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
};

// Update Task Flow

// const updateUser = async (req, res, next) => {
//   const { UserModel } = res.locals.connection.databaseObject;
//   try {
//     UserModel.findOneAndUpdate(
//       {
//         email: req.params.email,
//       },
//       { email: req.body.email, userName: req.body.userName },
//       (err, doc) => {
//         if (err) throw new Error(err);
//         res.status(200).send({ status: 200, message: "Task Updated" });
//       }
//     );
//   } catch (err) {
//     res.status(400).send({
//       status: 400,
//       message: err.message,
//     });
//   }
// };


const fetchMyUsers = async (req, res, next) => {
  const { userModel } = res.locals.connection.databaseObject;
  try {
    const { companyEmail } = req.query;
    const response = await userModel.find({ companyEmail });

    res
      .status(200)
      .send({ status: 200, result: response.length, data: response });
  } catch (err) {
    res.status(200).send({
      status: 400,
      message: err.message,
    });
  }
};

const postChat = async (req, res, next) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const { ChatModel } = res.locals.connection.databaseObject;
    const response1 = await ChatModel.findOne({ senderId, receiverId });
    const response2 = await ChatModel.findOne({
      senderId: receiverId,
      receiverId: senderId,
    });
    message._id = ObjectId(message._id);

    if (response1) {
      if (message)
        message.map((data) => {
          response1.message.push(data);
        });
      response1.save();
      res.status(200).send({ status: 200, message: "message is sent" });
    } else if (response2) {
      if (message)
        message.map((data) => {
          response2.message.push(data);
        });
      response2.save();
      res.status(200).send({ status: 200, message: "message is sent" });
    } else {
      await ChatModel.create({
        senderId,
        receiverId,
        message,
      });
      res.status(200).send({ status: 200, message: "message is sent" });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
};

const getChat = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.query;
    const { ChatModel } = res.locals.connection.databaseObject;
    const response1 = await ChatModel.findOne({ senderId, receiverId });
    const response2 = await ChatModel.findOne({
      senderId: receiverId,
      receiverId: senderId,
    });
    if (response1) {
      res.status(200).send({ status: 200, data: response1 });
    } else if (response2) {
      res.status(200).send({ status: 200, data: response2 });
    } else {
      throw new Error("Chat Not Found!");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Chat Not Found!",
    });
  }
};

const getLatestMessage = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;
    const { ChatModel } = res.locals.connection.databaseObject;
    const latestMessageArray = [];
    for (let i of receiverId) {
      const response1 = await ChatModel.findOne({ senderId, receiverId: i })
        .populate({
          path: "senderId",
          select: ["email", "typeOfUser", "userName"],
        })
        .populate({
          path: "receiverId",
          select: ["email", "typeOfUser", "userName"],
        });
      const response2 = await ChatModel.findOne({
        senderId: i,
        receiverId: senderId,
      })
        .populate({
          path: "senderId",
          select: ["email", "typeOfUser", "userName"],
        })
        .populate({
          path: "receiverId",
          select: ["email", "typeOfUser", "userName"],
        });
      if (response1) {
        const obj = {
          senderId: response1.senderId,
          receiverId: response1.receiverId,
        };
        if (response1.message.length > 0) {
          obj.message = response1.message[response1.message.length - 1];
          latestMessageArray.push(obj);
        }
      } else if (response2) {
        const obj = {
          senderId: response2.receiverId,
          receiverId: response2.senderId,
        };
        if (response2.message.length > 0) {
          obj.message = response2.message[response2.message.length - 1];
          latestMessageArray.push(obj);
        }
      }
    }
    const newlatestMessageArray = latestMessageArray.sort((a, b) => {
      let date1 = new Date(a.message.date);
      let date2 = new Date(b.message.date);
      return date2 - date1;
    });

    res.status(200).send({
      status: 200,
      result: newlatestMessageArray.length,
      data: newlatestMessageArray,
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Chat Not Found!",
    });
  }
};

const createGroup = async (req, res, next) => {
  try {
    const { adminId, groupName, members } = req.body;
    const { userModel } = res.locals.connection.databaseObject;
    const { GroupChatModel } = res.locals.connection.databaseObject;

    const response = await GroupChatModel.create({
      adminId,
      groupName,
      members,
    });

    const user = await userModel.findById(adminId);
    if (
      user &&
      (user.typeOfUser === "Admin" || user.typeOfUser === "SuperAdmin")
    ) {
      for (let i of members) {
        const user = await userModel.findById(i);
        user.myGroups.push(groupName);
        await user.save();
      }

      res.status(201).send({
        status: "success",
        message: "Group Created!",
        data: response,
      });
    } else {
      throw new Error("You do not have access to these route!");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(404).send({
        status: 404,
        message: "Group Name will be unique!",
      });
    } else {
      res.status(404).send({
        status: 404,
        message: error.message,
      });
    }
  }
};

const sendGroupChat = async (req, res, next) => {
  try {
    const { groupName, senderId, message } = req.body;
    const { GroupChatModel } = res.locals.connection.databaseObject;

    const group = await GroupChatModel.findOne({ groupName });
    console.log(group);
    if (group && group.members.includes(senderId)) {
      if (message)
        message.map((data) => {
          group.message.push(data);
        });
      await group.save();
      res.status(200).send({ status: 200, message: "message is sent" });
    } else {
      throw new Error("User does not belong to these group!");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message,
    });
  }
};

const getGroupChat = async (req, res, next) => {
  try {
    const { groupName, userId } = req.query;
    const { GroupChatModel } = res.locals.connection.databaseObject;
    const group = await GroupChatModel.findOne({ groupName });
    if (group && group.members.includes(userId)) {
      res.status(200).send({ status: 200, data: group });
    } else {
      throw new Error("You do not have access");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "Group Not Found!",
    });
  }
};

const getLatestGroupMessage = async (req, res, next) => {
  try {
    const { groupName, userId } = req.body;
    const { GroupChatModel } = res.locals.connection.databaseObject;
    let latestMessageArray = [];
    for (let i of groupName) {
      const group = await GroupChatModel.findOne({ groupName: i });
      if (group && group.members.includes(userId)) {
        if (group.message.length > 0) {
          const obj = {};
          obj.message = group.message[group.message.length - 1];
          obj.groupName = group.groupName;
          obj.groupId = group._id;
          latestMessageArray.push(obj);
        } else {
          const obj = {};
          obj.message = {
            content: "",
            senderName: "",
            date: null,
            senderId: "",
          };
          obj.groupName = group.groupName;
          obj.groupId = group._id;
          latestMessageArray.push(obj);
        }
      }
    }

    latestMessageArray = latestMessageArray.sort((a, b) => {
      let date1 = new Date(a.message.date);
      let date2 = new Date(b.message.date);
      return date2 - date1;
    });

    res.status(200).send({
      status: 200,
      result: latestMessageArray.length,
      data: latestMessageArray,
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "Group Not Found!",
    });
  }
};

const newMember = async (req, res, next) => {
  try {
    const { members, groupName } = req.body;
    const { GroupChatModel } = res.locals.connection.databaseObject;
    const { userModel } = res.locals.connection.databaseObject;
    const group = await GroupChatModel.findOne({ groupName });

    if (group) {
      if (members) {
        for (let i of members) {
          const user = await userModel.findById(i);
          user.myGroups.push(groupName);
          await user.save();
        }
        members.map((data) => {
          group.members.push(data);
        });
        await group.save();
        res.status(200).send({ status: 200, message: "member is added" });
      }
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "Group Not Found!",
    });
  }
};

const removeMembers = async (req, res, next) => {
  try {
    const { groupName, membersId, adminId } = req.body;
    const { GroupChatModel } = res.locals.connection.databaseObject;
    const { userModel } = res.locals.connection.databaseObject;
    const group = await GroupChatModel.findOne({ groupName });
    if (group && adminId !== group.adminId && membersId) {
      for (let i of membersId) {
        const user = await userModel.findById(i);
        user.myGroups = user.myGroups.filter((data) => data !== groupName);
        user && (await user.save());
      }
      group.members = group.members.filter((data) => data !== membersId[0]);
      await group.save();
      res.status(200).send({ status: 200, message: "member is removed" });
    } else {
      throw new Error("Admin Can Not Be Removed!");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Remove Members Successfully!",
    });
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { chatId, userId, messageId } = req.body;
    const { ChatModel } = res.locals.connection.databaseObject;

    const userChat = await ChatModel.findById(chatId);
    const currentChat = userChat.message.filter(
      (data) => data._id == messageId
    );
    if (currentChat[0].senderId == userId) {
      userChat.message = userChat.message.filter(
        (data) => data._id != messageId
      );
      await userChat.save();
      res.status(200).send({ status: 200, message: "message deleted!" });
    } else {
      throw new Error("Some Error Occured!");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Some Error Occured Please Try Again Later!",
    });
  }
};

const deleteGroupMessage = async (req, res, next) => {
  try {
    const { chatId, userId, messageId } = req.body;
    const { GroupChatModel } = res.locals.connection.databaseObject;
    const userChat = await GroupChatModel.findById(chatId);
    const currentChat = userChat.message.filter(
      (data) => data._id == messageId
    );
    if (currentChat[0].senderId == userId) {
      userChat.message = userChat.message.filter(
        (data) => data._id != messageId
      );
      await userChat.save();
      res.status(200).send({ status: 200, message: "message deleted!" });
    } else {
      throw new Error("Some Error Occured!");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "Some Error Occured Please Try Again Later!",
    });
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    const { adminId, groupId } = req.body;
    const { GroupChatModel } = res.locals.connection.databaseObject;
    const { userModel } = res.locals.connection.databaseObject;
    const group = await GroupChatModel.findById(groupId);
    if (group && group.adminId == adminId) {
      for (let i of group.members) {
        const user = await userModel.findById(i);
        user.myGroups = user.myGroups.filter(
          (data) => data !== group.groupName
        );
        await user.save();
      }
      await GroupChatModel.findByIdAndDelete(groupId);
      res.status(200).send({ status: 200, message: "Deleted Group" });
    } else {
      throw new Error("You Do Not Have Access");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Some Error Occured Please Try Again Later!",
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { aboutUs, socialMediaLinks, userName, email } = req.body;
    const { userModel } = res.locals.connection.databaseObject;
    const { companyUserModel } = await dependencyInjector(res.locals.params);
    await userModel.findOneAndUpdate(
      { email },
      {
        aboutUs,
        socialMediaLinks,
        userName,
      },
      { new: true, upsert: true }
    );

    await companyUserModel.findOneAndUpdate(
      { email },
      {
        aboutUs,
        socialMediaLinks,
        userName,
      },
      { new: true, upsert: true }
    );

    res
      .status(200)
      .send({ status: 200, message: "User Updated SuccessFully!" });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "User Not Found!",
    });
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const { userModel } = res.locals.connection.databaseObject;
    const { email } = req.query;
    const response = await userModel.findOne({ email }, { password: false });
    res.status(200).send({ status: 200, data: response });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "User Not Found!",
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { userModel } = res.locals.connection.databaseObject;
    const { companyUserModel } = await dependencyInjector(res.locals.params);
    await userModel.findOneAndDelete({ email });
    await companyUserModel.findOneAndDelete({ email });
    res.status(202).send({
      status: 202,
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: 404,
      message: "Some Error Occured!",
    });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { userModel } = res.locals.connection.databaseObject;
    const { companyUserModel } = await dependencyInjector(
      req.params.databaseID
    );
    const user = await userModel.findOne({ email });
    const user1 = await companyUserModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "User not found with this email!",
      });
    }
    const otp = Math.ceil(Math.random() * 9998);
    if (otp < 1000) otp += 1056;
    sendOtp(email, otp);
    user.otp = otp;
    user1.otp = otp;
    await user.save();
    await user1.save();
    res.status(200).send({
      satus: 200,
      message: "Otp send Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: 404,
      message: "Some Error Occured!",
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const { userModel } = res.locals.connection.databaseObject;
    const { companyUserModel } = await dependencyInjector(
      req.params.databaseID
    );
    const user = await userModel.findOne({ email, otp });
    const user1 = await companyUserModel.findOne({ email, otp });
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "Wrong OTP!",
      });
    }
    user.otp = 0;
    user1.otp = 0;
    user.password = password;
    user1.password = await bcrypt.hash(password, 10);
    await user.save();
    await user1.save();
    res.status(202).send({
      status: 202,
      message: "Password Updated Successfully!",
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "Some Error Occured!",
    });
  }
};

module.exports = {
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
  deleteGroupMessage,
  removeMembers,
  deleteGroup,
  deleteMessage,
  getMyProfile,
  getLatestMessage,
  getLatestGroupMessage,
  deleteUser,
  forgotPassword,
  resetPassword,
  createChecklist,
  fetchCheckList,
  // viewChecklists,
  fetchNewestChecklistForUser,
  updateChecklist,
  // submitAnnouncementResponse,
};
