import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}