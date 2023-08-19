const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/todoRoutes')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'https://todo-mern-frondend.onrender.com' }))
const PORT = process.env.PORT || 5000

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log('connected'))
.catch((error)=>console.log(error))

app.use(router)
app.listen(PORT,()=>console.log(`listening to ${PORT}`))