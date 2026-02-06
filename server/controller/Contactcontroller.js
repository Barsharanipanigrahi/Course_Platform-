const Contact = require("../model/Contact");

const AddContact = async (req, res) => {
  try {
    const contact = await Contact.create(req, res)


    return res.json({
      message: "success",
      Contact: contact,
      status: true
    });
  } catch (err) {
    return res.json({
      message: "Error while create contact",
      status: false,
    });
  }
};
const GetContact = async (req, res) => {
  try {
    const xyz=await Contact.find()
    return res.json({
      message:"lets get contact",
      Contact:xyz,
      status:true
    });
  }
  catch (err) {

    console.log(err)

    return res.json({
      message: "error while fetch",
      status: false,
    })

  }

}
const UpdateContact=async (req,res)=>{
  try{
    const UpdateContact=await Contact.findByIdAndUpdate(req.param.id,req.body)
    return res.json({
      message:"updated contact",
      status:true,
      UpdateContact
      // id :req.param.id
    })
  }catch (err){
    return res.json({
      message:"error while update",

    })
  }
}
const DeleteContact= async (req,res)=>{
  try{
    const DeleteContact=await Contact.findByIdAndDelete(req.params.id)
    return res.json({
      message:"deleted contact",
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
  AddContact,
  GetContact,
  UpdateContact,
  DeleteContact,
};