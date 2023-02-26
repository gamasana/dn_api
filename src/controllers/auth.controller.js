const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const sendMail = require("../utils/sendEmail")
const crypto = require('crypto')

exports.signup = async(req, res) => {
    User.findOne({email: req.body.email}).exec(async (error, user) =>{
        

        if(user){
            
            res.status(400).json({
                message: 'user already exist'
            })
            
        }

        const {firstName, lastName, email, password} = req.body

        const hash_password = await bcrypt.hash(password, 10)
        const _user = await new User({
            firstName,
            lastName,
            email,
            hash_password,
        }).save()

        const token = await new Token({
            userId: _user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        const url = `${process.env.BASE_URL}user/${token.userId}/verify/${token.token}`
        await sendMail(_user.email, "Verify Email", url);

        res.status(201).json({
            message: "An Email has been sent to your account, please verify",
            })
    })
}


exports.verifyToken = async(req, res)  => {
    
    try {
        const user = await User.findOne({_id: req.params.id})
        if(!user) return res.status(400).send({message:"invalid link"})

        const token = await Token.findOne({
            userId: req.params.id,
            token: req.params.token
        })

        if(!token)return res.status(400).send({message:"invalid link, bad token"})

        await User.updateOne({_id: user._id}, {verified: true})
        await token.remove()
        res.status(200).send({message:"Email verified successfully"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }   
}


exports.signin = async(req, res) => {

    User.findOne({email: req.body.email}).exec(async (error, user) => {
        try {
            if(error) return res.status(400).json({message: 'something went wrong'})

            if(user){
                if(user.authenticate(req.body.password)){
                    if(!user.verified && user){
                        let token = await Token.findOne({userId: user._id})
                        if(!token){
                            const token = await new Token({
                                userId: user._id,
                                token: crypto.randomBytes(32).toString("hex")
                            }).save();
                            const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`
                            await sendMail(user.email, "Verify Email", url);
                        }
                        return res.status(400).send({message:"An email was sent to your account, Please verify"})
                    }
                    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
                    res.cookie("token", token, {expiresIn: '2d', httpOnly: false })
                    const {_id, firstName, lastName, email, role, fullName} = user
                    res.status(201).json({
                        token,
                        user: {_id, firstName, lastName, email, role, fullName}
                    })
                }else{
                    res.status(400).json({
                        message: 'Invalid email or password'
                    })
                }
            }else{
                res.status(400).json({
                    message: 'Invalid email or password'
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'Invalid email or password', error
            })
        }


        
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
      message: "Signout successfully...!"
    })
  }