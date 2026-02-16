const Courses=require("../model/Courses");

const AddCourses=async (req,res)=>{
    try{
        const courses=await Courses.create(req.body)

        return res.json({
            message:"sucess",
            courses:courses,
            status:true
        });
    }catch (err){
        return res.json({
            message:"Error while create courses",
            status:false,
        });
    }
};
const GetCourses=async (req,res)=>{
    try{
        const xyz=await Courses.find()
        return res.json({
            message:"lets get courses",
            courses:xyz,
            status:true,
        });
    }catch (err){
        console.log(err)

    return res.json({
      message: "error while fetch",
      status: false,
    })

  }

}
const UpdateCourses=async (req,res)=>{
  try{
    const UpdateCourses=await Courses.findByIdAndUpdate(req.params.id,req.body)
    return res.json({
      message:"Update Courses",
      status:true,
      UpdateCourses
      // id :req.param.id
    })
  }catch (err){
console.log(err)

    return res.json({
      message:"error while update",

    })
  }
}
const DeleteCourses= async (req,res)=>{
  try{
    const DeleteCourses=await Courses.findByIdAndDelete(req.params.id)
    return res.json({
      message:"Delete Courses",
      status:true
    })

  }catch(err){
    console.log(err);
    return res.json({
      message:"error while delete",
      status:false,
    })
  }
};

module.exports = {
  AddCourses,
  GetCourses,
  UpdateCourses,
  DeleteCourses,
};
