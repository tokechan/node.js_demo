
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';
import { User } from '../models/User';
import { errorMessages } from './errorMessages';
import { successMessages } from './successMessage'; 



export const getTodos = async (req: Request, res: Response) => {
    try {
        const todoRepo = AppDataSource.getRepository(Todo);
        const todos = await todoRepo.find({
            relations: ['user']
        });
        res.json({
            message: successMessages.TODO_FETCHED,
            todos
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, userId } = req.body;

        if(!title || !userId) {
            return res.status(400).json({ error: errorMessages.TITLE_REQUIRED });
        }

        const todoRepo = AppDataSource.getRepository(Todo);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOneBy({id: userId });

        if(!user) {
            return res.status(404).json({ error: errorMessages.USER_NOT_FOUND });
        }

        const newTodo = new Todo();
        newTodo.title = title;
        newTodo.completed = false;
        newTodo.user = user;

        const saved = await todoRepo.save(newTodo);
        res.status(201).json({
            message: successMessages.TODO_CREATED,
            todo: saved
        });
    } catch (error) {
        console.error(
            'Failed to create todo',
            error
        );
        res.status(500).json({ error: errorMessages.FAILED_TO_CREATE_TODO });
    }
};

export const updateTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id: Number(id) });

        if (!todo) {
            return res.status(404).json({ error: errorMessages.TODO_NOT_FOUND });
        }

        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;

        const updatedTodo = await todoRepo.save(todo);
        res.json({
            message: successMessages.TODO_UPDATED,
            todo: updatedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: errorMessages.FAILED_TO_UPDATE_TODO });
    }
};

export const deleteTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const  { id } = req.params;

    try {
        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id: Number(id) });

        if (!todo) {
            return res.status(404).json({ error: errorMessages.TODO_NOT_FOUND });
        }

        await todoRepo.remove(todo);
        res.status(204).json({
            message: successMessages.TODO_DELETED
        });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: errorMessages.FAILED_TO_DELETE_TODO });   
    }
};

    
