const pushNotification = async (req, res, next) => {
  try {
    const { notificationModel } = res.locals.connection.databaseObject;

    const {
      receiverId,
      chatNotification,
      groupChatNotification,
      taskNotification,
      supportNotification,
    } = req.body;
    const notification = await notificationModel.findOne({ receiverId });
    if (notification) {
      if (chatNotification) {
        let i;
        for (i = 0; i < notification.chatNotification.length; ++i) {
          if (
            notification.chatNotification[i].senderId ==
            chatNotification[0].senderId
          ) {
            notification.chatNotification[i].messageCount++;
            break;
          }
        }
        if (i == notification.chatNotification.length) {
          notification.chatNotification.push({
            senderId: chatNotification[0].senderId,
            messageCount: 1,
            content: chatNotification[0].content,
          });
        }
      }
      if (groupChatNotification) {
        let i;
        for (i = 0; i < notification.groupChatNotification.length; ++i) {
          if (
            notification.groupChatNotification[i].groupName ==
            groupChatNotification[0].groupName
          ) {
            notification.groupChatNotification[i].messageCount++;
            break;
          }
        }
        if (i == notification.groupChatNotification.length) {
          notification.groupChatNotification.push({
            groupName: groupChatNotification[0].groupName,
            messageCount: 1,
            content: groupChatNotification[0].content,
          });
        }
      }
      if (taskNotification) {
        notification.taskNotification.content.push(taskNotification.content[0]);
      }
      if (supportNotification) {
        notification.supportNotification += 1;
      }
      await notification.save();
    } else {
      await notificationModel.create({
        receiverId,
        chatNotification,
        groupChatNotification,
        taskNotification,
        supportNotification,
      });
    }
    res.status(200).send({
      status: 200,
      message: "Notification Send!",
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error,
    });
  }
};

const getNotification = async (req, res, next) => {
  try {
    const { notificationModel } = res.locals.connection.databaseObject;
    const { id } = req.params;
    const notification = await notificationModel.find({ receiverId: id });
    res.status(200).send({
      status: 200,
      data: notification,
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error,
    });
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const { notificationModel } = res.locals.connection.databaseObject;
    const { id } = req.params;
    await notificationModel.findOneAndDelete({ receiverId: id });
    res.status(202).send({
      status: 202,
      message: "Notification Delete!",
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "Sone Error Ocuured!",
    });
  }
};

const filterNotification = async (req, res, next) => {
  try {
    const { notificationModel } = res.locals.connection.databaseObject;
    const { receiverId, senderId, groupName, supportNotification } = req.body;
    const notification = await notificationModel.findOne({ receiverId });

    if (senderId) {
      notification.chatNotification = notification.chatNotification.map(
        (data) => {
          if (data.senderId == senderId) {
            data.messageCount = 0;
          }
          return data;
        }
      );
    } else if (groupName) {
      notification.groupChatNotification =
        notification.groupChatNotification.map((data) => {
          if (data.groupName == groupName) {
            data.messageCount = 0;
          }
          return data;
        });
    } else if (supportNotification) {
      notification.supportNotification = 0;
    } else {
      notification.taskNotification.content = [];
    }
    notification.save();

    res.status(202).send({
      status: 202,
      message: "Notification Updated!",
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: "Sone Error Ocuured!",
    });
  }
};

module.exports = {
  pushNotification,
  getNotification,
  deleteNotification,
  filterNotification,
};
