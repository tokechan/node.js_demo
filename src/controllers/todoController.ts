
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';
import { User } from '../models/User';
import { errorMessages } from './errorMessages';
import { successMessages } from './successMessage'; 
import { HttpStatusCode } from '../constants/httpStatusCodes';
import { createTodoSchema, updateTodoSchema, todoIdParamSchema } from '../validations/todoSchema';


export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("💥 ここ通ってるよ")

        const todoRepo = AppDataSource.getRepository(Todo);
        console.log("💥 Repository acquired");
        const todos = await todoRepo.find();
        console.log("💥 Todos fetched", todos);

        res.json({
            message: successMessages.TODO_FETCHED,
            todos
        });
    } catch (error) {
        console.error("💥 Error fetching todos:", error);
        next(error);
    }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = createTodoSchema.safeParse(req.body);

        if(!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            return res.status(HttpStatusCode.BAD_REQUEST).json({ errors });
        }

        
        const { title, userId } = parsed.data;

     
        const todoRepo = AppDataSource.getRepository(Todo);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOneBy({id: userId });

        if(!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error: errorMessages.USER_NOT_FOUND });
        }

        const newTodo = new Todo();
        newTodo.title = title;
        newTodo.completed = false;
        newTodo.user = user;

        const saved = await todoRepo.save(newTodo);
        res.status(HttpStatusCode.CREATED).json({
            message: successMessages.TODO_CREATED,
            todo: saved
        });
    } catch (error) {
        console.error(
            'Failed to create todo',
            error
        );
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessages.FAILED_TO_CREATE_TODO });
    }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const  { id } = req.params;

        const parsed = updateTodoSchema.safeParse(req.body);
        
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            return res
            .status(HttpStatusCode.BAD_REQUEST)
            .json({ errors });
        }


        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id: Number(id) });

        if (!todo) {
            return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ error: errorMessages.TODO_NOT_FOUND });
        }

        const { title, completed } = parsed.data;
        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;

        const updatedTodo = await todoRepo.save(todo);
        res.json({
            message: successMessages.TODO_UPDATED,
            todo: updatedTodo
        });
    } catch (error) {
        console.error(
            'Failed to update todo',
            error
        );
        res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessages.FAILED_TO_UPDATE_TODO });
    }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = todoIdParamSchema.safeParse(req.params);
        if(!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            return res.status(HttpStatusCode.BAD_REQUEST).json({ errors});
        }

        const  { id } = parsed.data;

        const todoRepo = AppDataSource.getRepository(Todo);
        const todo = await todoRepo.findOneBy({ id });
        console.log('🧪 todo result:', todo); // ここで null/undefined か確認


        if (!todo) {
            return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ error: errorMessages.TODO_NOT_FOUND });
        }

        await todoRepo.remove(todo);
        res.status(HttpStatusCode.NO_CONTENT).json({
            message: successMessages.TODO_DELETED
        });
    } catch (error) {
        console.error(
            'Failed to delete todo',
            error
        );
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessages.FAILED_TO_DELETE_TODO });   
    }
};

    
