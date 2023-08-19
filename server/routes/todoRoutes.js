const {Router} = require('express')
const { getAllTodo, saveTodo, updateTodo, deleteTodo, completeTodo } = require('../controllers/TodoController')
const router = Router()

router.get('/',getAllTodo)
router.post('/save',saveTodo)
router.patch('/complete',completeTodo)
router.patch('/update',updateTodo)
router.post('/delete',deleteTodo)

module.exports = router