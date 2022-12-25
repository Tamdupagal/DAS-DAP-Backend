const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

const {
  dependencyInjector,
} = require("../../Database/Schemas/AuthenticationDBConnection");

const createUser = async (req, res) => {
  try {
    const { userName, email, password, companyEmail } = req.body;

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
      typeOfUser: "User",
    });
    let newLoginUser = await companyUserModel.create({
      userName: userName,
      email: email,
      password: await bcrypt.hash(password, 10),
      typeOfUser: "User",
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

const updateUser = async (req, res, next) => {
  const { UserModel } = res.locals.connection.databaseObject;
  try {
    UserModel.findOneAndUpdate(
      {
        email: req.params.email,
      },
      { email: req.body.email, userName: req.body.userName },
      (err, doc) => {
        if (err) throw new Error(err);
        res.status(200).send({ status: 200, message: "Task Updated" });
      }
    );
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
};

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
    const response1 = await ChatModel.findOne({senderId,receiverId})
    const response2 = await ChatModel.findOne({senderId:receiverId,receiverId:senderId})
    if(response1){
      if(message)
      message.map((data)=>{response1.message.push(data)})
      response1.save()
      res
      .status(200)
      .send({ status: 200, message:'message is sent'});
    }
    else if(response2){
      if(message)
      message.map((data)=>{response2.message.push(data)})
      response2.save()
      res
      .status(200)
      .send({ status: 200, message:'message is sent'});
    }else{
       await ChatModel.create({
        senderId,
        receiverId,
        message
       })
       res
       .status(200)
       .send({ status: 200, message:'message is sent'});
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
    const response1 = await ChatModel.findOne({senderId,receiverId})
    const response2 = await ChatModel.findOne({senderId:receiverId,receiverId:senderId})
    if(response1){
      res
      .status(200)
      .send({ status: 200, data:response1});
    }
    else if(response2){
      res
      .status(200)
      .send({ status: 200, data:response2});
    }else{
      throw new Error('Chat Not Found!')
    }
    
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || 'Chat Not Found!' 
    });
  }
};

const createGroup = async(req,res,next)=>{
  try {

    const {adminId,groupName,members } = req.body
    const { userModel } = res.locals.connection.databaseObject;
    const { GroupChatModel } = res.locals.connection.databaseObject;
    
     const user = await userModel.findById(adminId)
     console.log(user)
     if(user && (user.typeOfUser === 'Admin' || user.typeOfUser === 'SuperAdmin')){
        const response = await GroupChatModel.create({
          adminId,
          groupName,
          members
        })

        res.status(201).send({
          status:'success',
          message:'Group Created!',
          data:response
        })
     }else{
       throw new Error('You do not have access to these route!')
     }
    
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message 
    });
  }
}

const sendGroupChat = async(req,res,next)=>{
  try {
    const {groupName,senderId,message} = req.body
  const { GroupChatModel } = res.locals.connection.databaseObject;

  const group = await GroupChatModel.find({groupName})
  if(group && group.members.includes(senderId) ){
    if(message)
    message.map((data)=>{group.message.push(data)})
    group.save()
    res
    .status(200)
    .send({ status: 200, message:'message is sent'});
  }else{
    throw new Error('User does not belong to these group!')
  }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message 
    });
  }
}

const getGroupChat = async(req,res,next)=>{
  try {
    const {groupName} = req.query
    const { GroupChatModel } = res.locals.connection.databaseObject;
    const response = await GroupChatModel.find({groupName})
    res
    .status(200)
    .send({ status: 200,data:response});
    
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: 'Group Not Found!' 
    });
  }
}

const newMember =  async(req,res,next)=>{
  try {
    const {groupName,members} = req.body;
const { GroupChatModel } = res.locals.connection.databaseObject;
 const group = await GroupChatModel.find({groupName})

 if(group){
  if(members){
    members.map((data)=>{group.members.push(data)})
    group.save()
    res
    .status(200)
    .send({ status: 200, message:'member is added'});
  }
 }
    
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: 'Group Not Found!' 
    });
  }

} 

const deleteGroupMessage = async(req,res,next)=>{
  try {

    const {id} = req.params
    const {groupName,senderId} = req.query
    const { GroupChatModel } = res.locals.connection.databaseObject;
   const group = await GroupChatModel.find({groupName})

   if(group){

    
     res
     .status(200)
     .send({ status: 200, message:group.message});

   }

  } catch (error) {
    res.status(404).send({
      status: 404,
      message: 'Some Error Occured Please Try Again Later!' 
    });
  }



}

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
  deleteGroupMessage
};
