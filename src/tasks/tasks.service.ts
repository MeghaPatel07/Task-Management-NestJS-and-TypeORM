import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  //create
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      assigneeId: createTaskDto.assigneeId || null,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
    });


    return this.taskRepository.save(task);
  }



  //getAllusers
  async findAll(): Promise<any[]> 
  {

    const tasks = await this.taskRepository.find({
      order: { createdAt: 'DESC' },
    });
 
    const tasksWithAssignee = await Promise.all(
      tasks.map(async (task) => {
        let assignee = null;
        if (task.assigneeId) 
          {
          try 
          {
            assignee = await this.userRepository.findOne({
              where: { _id: new ObjectId(task.assigneeId) },
            });
          } catch (error) {
            // ignor
          }
        }
        return {
          ...task,
          assignee,
        };
      })
    );

    return tasksWithAssignee;
  }


//findByid
  async findOne(id: string): Promise<any> {

    const task = await this.taskRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
 
    let assignee = null;
    if (task.assigneeId) {
      try
       {
        assignee = await this.userRepository.findOne({
          where: { _id: new ObjectId(task.assigneeId) },
        });
      } catch (error) {
        // ignore
      }
    }

    return {
      ...task,
      assignee,
    };
  }


////UpdateUser
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    const updateData = {
      ...updateTaskDto,
      assigneeId: updateTaskDto.assigneeId !== undefined ? updateTaskDto.assigneeId : task.assigneeId,
      dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : task.dueDate,
    };

    Object.assign(task, updateData);
    return this.taskRepository.save(task);
  }




  //Deleteuser

  async remove(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    await this.taskRepository.remove(task);
  }
}