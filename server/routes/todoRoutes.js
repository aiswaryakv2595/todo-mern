const {Router} = require('express')
const { getAllTodo, saveTodo, updateTodo, deleteTodo, completeTodo, signup, login, dashboard } = require('../controllers/TodoController')
const { jwtAuth } = require('../middleware/jwtAuth')
const router = Router()
router.post('/signup',signup)
router.post('/login',login)
router.get('/dashboard',jwtAuth,dashboard)
router.get('/todo',jwtAuth,getAllTodo)
router.post('/save',jwtAuth,saveTodo)
router.patch('/complete',completeTodo)
router.patch('/update',updateTodo)
router.post('/delete',deleteTodo)

module.exports = router