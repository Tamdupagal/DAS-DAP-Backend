

const createUpdates = async (req, res, next) => {
    try {
      const {content} = req.body;
      const { UpdateModel } = res.locals.connection.databaseObject;
  
      const updates = await UpdateModel.create({ content });
      res.status(201).send({
        status:201,
        data:updates
      });

    } catch (error) {
      res.status(404).send({
        status: 404,
        message: error.message,
      });
    }
  };

  const getAllUpdates = async (req, res, next) => {
    try {
      const { UpdateModel } = res.locals.connection.databaseObject;
  
      const updates = await UpdateModel.find({});
      res.status(200).send({
        status:200,
        data:updates,
      });

    } catch (error) {
      res.status(404).send({
        status: 404,
        message: error.message,
      });
    }
  };

  const deleteUpdates = async (req, res, next) => {
    try {
      const {id} = req.params;
      const { UpdateModel } = res.locals.connection.databaseObject;
  
      await UpdateModel.findByIdAndDelete(id);
      res.status(202).send({
        status:202,
        data:"Updates Deleted Succesfully"
      });

    } catch (error) {
      res.status(404).send({
        status: 404,
        message: error.message,
      });
    }
  };

  module.exports={
    createUpdates,
    getAllUpdates,
    deleteUpdates
  }