import { Request, Response } from "express";
import * as todoService from '../services/todoService';

export const getTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await todoService.getAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const newTodo = await todoService.create(req.body.text);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
};
