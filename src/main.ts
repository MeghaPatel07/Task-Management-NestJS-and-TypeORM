import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
 
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`running on: http://localhost:${port}`);
  console.log(`
🚀 Task Management API is ready! (Now with MongoDB)

📌 Authentication:
   POST /auth/login - Get JWT token

🔧 Task Management:
   GET  /tasks      - Get all tasks
   POST /tasks      - Create new task
   GET  /tasks/:id  - Get task by ID (MongoDB ObjectId)
   PATCH /tasks/:id - Update task
   DELETE /tasks/:id - Delete task

👥 Team Management:
   GET  /teams      - Get all teams
   POST /team       - Create new team
   GET  /team/:id   - Get team by ID (MongoDB ObjectId)
   PATCH /team/:id  - Update team
   DELETE /team/:id - Delete team

👤 User Management:
   GET  /users      - Get all users
   POST /users      - Create new user
   GET  /user/:id   - Get user by ID (MongoDB ObjectId)
   PATCH /user/:id  - Update user
   DELETE /user/:id - Delete user

💡 Remember to include Authorization: Bearer <token> header for all protected endpoints!
🗄️  Database: MongoDB Atlas (${process.env.MONGODB_URI ? 'Connected' : 'Not configured'})
  `);
}
bootstrap();