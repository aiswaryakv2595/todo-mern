const Todo = require('../models/todoModel')
const getAllTodo = async (req,res) =>{
   try {
    const todo = await Todo.find()
    res.status(200).json(todo)
   } catch (error) {
    throw new Error(error)
   }
}

const saveTodo = async (req,res) => {
    const {text} = req.body
    const existing = await Todo.findOne({text:text})
    if(existing){
        res.status(409).json({message:"already exist"})
    }
    else{
    const savedData = new Todo({
        text
    })
    await savedData.save()
    res.status(201).json({todo:savedData})
}
}
const completeTodo = async (req,res) => {
    try {
        const {id} = req.body

        const todo = await Todo.findById({ _id: id });
        let updateStatus;
        if (todo.status) {
            updateStatus = false;
          } else {
            updateStatus = true;
          }
       await Todo.findByIdAndUpdate({_id:id},{$set:{status:updateStatus}})
        res.status(200).json({message:"Successfully completed"})
       } catch (error) {
        console.log(error)
       }
}
const updateTodo = async (req,res) =>{
   try {
    const {id,text} = req.body
   await Todo.findOneAndUpdate({_id:id},{$set:{text:text}})
    res.status(200).json({message:"Successfully updated"})
   } catch (error) {
    console.log(error)
   }
}
const deleteTodo = async (req,res) =>{
    try {
     const {id} = req.body
    await Todo.findByIdAndDelete({_id:id})
     res.status(200).json({message:"Successfully deleted"})
    } catch (error) {
     console.log(error)
    }
 }
module.exports = {
    getAllTodo,
    saveTodo,
    updateTodo,
    deleteTodo,
    completeTodo
}