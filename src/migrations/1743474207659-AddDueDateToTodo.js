"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDueDateToTodo1743474207659 = void 0;
class AddDueDateToTodo1743474207659 {
    constructor() {
        this.name = 'AddDueDateToTodo1743474207659';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`todo\` ADD \`dueDate\` datetime NULL`);
            yield queryRunner.query(`ALTER TABLE \`todo\` ADD \`userId\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_1e982e43f63a98ad9918a86035c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_1e982e43f63a98ad9918a86035c\``);
            yield queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`userId\``);
            yield queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`dueDate\``);
        });
    }
}
exports.AddDueDateToTodo1743474207659 = AddDueDateToTodo1743474207659;
