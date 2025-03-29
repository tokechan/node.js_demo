
import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todoRepository = AppDataSource.getRepository(Todo);
        const todos = await todoRepository.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
    }
};

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
