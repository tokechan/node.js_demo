import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';

const todoRepo = AppDataSource.getRepository(Todo);

export const getAll = async () => {
    return await todoRepo.find();
};

export const create = async (title: string, userId: number) => {
   const todo = todoRepo.create({ title, completed: false, user: { id: userId } });
   return await todoRepo.save(todo);
};
