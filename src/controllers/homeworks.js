

const uploadHomework = async (req, res, next) => {
  
  try{

    const {filename} = req.file
    console.log(req.body)

    res.status(200).json("TODO OK");
    next()
 
  }catch(err){
    console.error(err);
    next(err);
  }

}


module.exports = {
  uploadHomework
}