const User = require("../model/User");

// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json({
            status: true,
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error fetching users",
        });
    }
};

// DELETE USER
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({
            status: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error deleting user",
        });
    }
};

module.exports = { getAllUsers, deleteUser };
