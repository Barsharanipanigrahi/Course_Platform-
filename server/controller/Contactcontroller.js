const AddContact = async (req, res) => {
    try {
      return res.json({
        message: "lets create contact",
      });
    } catch (err) {
      return res.json({
        message: "Error while create contact",
        status: false,
      });
    }
  };
  
  module.exports = {
    AddContact,
  };