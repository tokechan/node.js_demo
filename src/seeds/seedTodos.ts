import { AppDataSource } from '../../ormconfig';
import { Todo } from '../models/Todo';
import { User } from '../models/User';

async function seed() {
  await AppDataSource.initialize();

  const todoRepo = AppDataSource.getRepository(Todo);
  const userRepo = AppDataSource.getRepository(User);

 const users = ['Alice', 'Bob', 'Charlie'].map((name) => userRepo.create({ name }));
 for (const user of users) {
    await userRepo.save(user);


  const todos = [
    { title: 'Write docs', completed: false },
    { title: 'Study TypeORM', completed: false },
    { title: 'Push to GitHub', completed: true },
  ];

  for (const t of todos) {
    const todo = todoRepo.create(t);
    await todoRepo.save(todo);
  }
}
  console.log('✅ Seeding completed!');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
