const Todo = require('../models/todoModel')
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const signup = async (req, res) => {
    try {
      const { name, username, password } = req.body;
      //if user already exist
      const existing = await User.findOne({
        username: username,
      });
      if (existing) {
        return res
          .status(409)
          .json({ message: "Admin already exists with the provided email." });
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: name,
        username: username,
        password: hashedPassword,
      });
  
      
      await user.save();
  
 
      res.status(201).json({ message: " signup successful." });
    } catch (error) {
      console.error("Error signing up :", error);
      res
        .status(500)
        .json({ message: "An error occurred while signing up admin." });
    }
  };

  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: "user not found." });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }
  
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.TOKEN,
        { expiresIn: "1d" }
      );
      res.status(200).json({ token: token });
    } catch (error) {
      console.error("Error logging in admin:", error);
      res
        .status(500)
        .json({ message: "An error occurred while logging in admin." });
    }
  };
  const dashboard = async (req,res) => {
    try {
      const user = req.user;
     
      res.status(200).json({user})
    } catch (error) {
      
    }
  }
const getAllTodo = async (req,res) =>{
   try {
    const todo = await Todo.find({userID:req.user._id})
    if(todo)
    res.status(200).json({todo})
  else
  res.status(404).json({message:"todo not found"})
   } catch (error) {
    throw new Error(error)
   }
}

const saveTodo = async (req, res) => {
  try {
    console.log('req.user', req); 

    const { text } = req.body;
    console.log(text)
    const existing = await Todo.findOne({ text: text });
console.log('first')
    if (existing) {
      return res.status(400).json({ message: 'Todo already exists' });
    }

    const savedData = new Todo({
      userID: req.user._id,
      text: text,
    });

    await savedData.save();
console.log(savedData)
res.status(201).json({ message: " signup successful." });
  } catch (error) {
    console.error('Error saving todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const completeTodo = async (req,res) => {
    try {
        const {todoId} = req.body

        const todo = await Todo.findById({ _id: todoId });
        let updateStatus;
        if (todo.status) {
            updateStatus = false;
          } else {
            updateStatus = true;
          }
       await Todo.findByIdAndUpdate({_id:todoId},{$set:{status:updateStatus}})
        res.status(200).json({message:"Successfully completed"})
       } catch (error) {
        console.log(error)
       }
}
const updateTodo = async (req,res) =>{
   try {
    const {todoId,text} = req.body
    console.log(todoId)
   await Todo.findOneAndUpdate({_id:todoId},{$set:{text:text}})
    res.status(200).json({message:"Successfully updated"})
   } catch (error) {
    console.log(error)
   }
}
const deleteTodo = async (req,res) =>{
    try {
     const {todoId} = req.body
    await Todo.findByIdAndDelete({_id:todoId})
     res.status(200).json({message:"Successfully deleted"})
    } catch (error) {
     console.log(error)
    }
 }
module.exports = {
    signup,
    login,
    dashboard,
    getAllTodo,
    saveTodo,
    updateTodo,
    deleteTodo,
    completeTodo
}