const User = require('../models/user.model')



exports.getUserDetails = async(req, res) => {
    const user = req.user
    User.findById({_id: user._id}).exec((user,error)=> {
        if(!user){
            return res.status(400).json({
                message: "Invalid User"
            })
        }

        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            firstName: user.firstName
        })
    })
}