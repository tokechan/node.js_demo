import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';

const todoRepo = AppDataSource.getRepository(Todo);

export const getAll = async () => {
    return await todoRepo.find();
};

export const create = async (text: string) => {
   const todo = todoRepo.create({ text });
   return await todoRepo.save(todo);
};
