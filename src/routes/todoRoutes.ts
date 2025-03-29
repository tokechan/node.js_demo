import { getTodos,  } from '../controllers/todoController';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export default router;
