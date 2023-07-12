
const createCourse = async (req, res, next) => {

  const {} = req.body;

  try{

    return res.status(200).json("Todo ok");
    
    next();

  }catch(err){
    console.error(err);
    next(err);
  }

}

module.exports = {
  createCourse
}