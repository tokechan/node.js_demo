
import { Request, Response } from 'express';
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
