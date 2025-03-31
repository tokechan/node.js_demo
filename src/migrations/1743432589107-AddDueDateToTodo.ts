import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDueDateToTodo1743432589107 implements MigrationInterface {
    name = 'AddDueDateToTodo1743432589107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`dueDate\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`dueDate\``);
    }

}
