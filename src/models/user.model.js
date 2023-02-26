const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique:true,
        max: 20 
    },
    hash_password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    }
    
}, {timestamps: true})

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password)
    }
}

userSchema.virtual('fullname')
.get( function(){
    return `${this.firstName} ${this.lastName}`
})

module.exports = mongoose.model('User', userSchema)