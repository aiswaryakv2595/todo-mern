const mongoose = require('mongoose')

const Schema = mongoose.Schema
const todoSchema = new Schema({
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
