const jwt = require('jsonwebtoken')
const env = require('dotenv')

env.config()

exports.requireSignin = (req, res, next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = user
    }else{
        return res.status(400).send({message:"Authorization required"})
    }
    next()
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
      return res.status(400).json({message: 'User access denied'})
     }
     next() 
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
     return res.status(400).json({message: 'Admin access denied'})
    }
    next()
}