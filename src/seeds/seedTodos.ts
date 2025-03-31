import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';

async function seed() {
  await AppDataSource.initialize();
  const todoRepo = AppDataSource.getRepository(Todo);

  const todos = [
    { title: 'Write docs', completed: false },
    { title: 'Study TypeORM', completed: false },
    { title: 'Push to GitHub', completed: true },
  ];

  for (const t of todos) {
    const todo = todoRepo.create(t);
    await todoRepo.save(todo);
  }

  console.log('✅ Seeding completed!');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
