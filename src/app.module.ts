import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { User } from './entities/user.entity';
import { Team } from './entities/team.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_URI'),
        database: 'task_management',
        entities: [User, Team, Task],
        synchronize: true, // Only for development
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TasksModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}