const mongoose = require('mongoose')

const Schema = mongoose.Schema
const todoSchema = new Schema({
    userID:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
  
},)


module.exports = mongoose.model('Todo',todoSchema);
