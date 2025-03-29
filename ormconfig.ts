import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Todo } from './src/models/Todo'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'db', // Docker service name
    port: 3306, // Internal port in the container
    username: 'root',
    password: 'password',
    database: 'todo_db',
    entities: [Todo],
    synchronize: true,
    logging: true,
})