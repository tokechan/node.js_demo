import { DataSource } from "typeorm";
import { Todo } from './src/models/Todo'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'todo_db',
    entities: [Todo],
    synchronize: true,
})