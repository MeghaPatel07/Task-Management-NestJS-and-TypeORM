import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from '../../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsMongoId()
  assigneeId?: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsMongoId()
  assigneeId?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}