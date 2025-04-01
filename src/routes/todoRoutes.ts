import { RequestHandler, Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';



const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);         // ← OK！
router.put('/:id', updateTodo);       // ← OK！
router.delete('/:id', deleteTodo);    // ← OK！

export default router;
