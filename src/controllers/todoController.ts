
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todoRepo = AppDataSource.getRepository(Todo);
        const todos = await todoRepo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
    }
};

<<<<<<< HEAD
// export const createTodo = async (req: Request, res: Response) => {
//     try {
//         const todoRepository = AppDataSource.getRepository(Todo);
//         const todo = new Todo();
//         todo.text = req.body.text;
//         const newTodo = await todoRepository.save(todo);
//         res.status(201).json(newTodo);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating todo", error });
//     }
// };
=======
export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const todoRepo = AppDataSource.getRepository(Todo);

        const newTodo = new Todo();
        newTodo.title = title;
        newTodo.completed = false;

        const saved = await todoRepo.save(newTodo);
        res.status(201).json(saved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create todo'});
    }
};

export const updateTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id: Number(id) });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;

        const updatedTodo = await todoRepo.save(todo);
        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

export const deleteTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const  { id } = req.params;

    try {
        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id: Number(id) });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        await todoRepo.remove(todo);
        res.status(204).send();
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete todo' });   
    }
};

    
>>>>>>> main
