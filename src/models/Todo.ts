import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";


@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ default: false})
    completed!: boolean;

    @Column({ type: 'datetime', nullable: true })
    dueDate: Date | null = null;

    @ManyToOne(() => User, (user) => user.todos)
    user!: User;
}