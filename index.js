const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const cors = require("cors")
const cookieParser = require('cookie-parser')


// Routes
const authRoute = require('./src/routes/auth.route')
const adminRoute = require('./src/routes/admin/admin.auth.route')
const depositRoute = require("./src/routes/deposit.route")
// const withdrawalRoute = require("./src/routes/withdrawal.route") 
const userRoute = require('./src/routes/user.route')

const app = express()
app.use(cookieParser())

env.config()




mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_DB_URL)
    .then(res => {app.listen(process.env.PORT, () => {
        console.log(`app listening on port ${process.env.PORT}`)
    })})

app.use(cors());
app.use(express.json())
app.use('/api', authRoute )
app.use('/api', adminRoute)
app.use('/api', depositRoute)
// app.use('/api', withdrawalRoute )
app.use('/api', userRoute)
