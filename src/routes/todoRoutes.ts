import { RequestHandler, Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';



const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo as RequestHandler);
router.delete('/:id', deleteTodo as RequestHandler);


export default router;
