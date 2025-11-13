import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('tasks')
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  description: string;

  @Column('date', { nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  assigneeId: string;

  @Column({ 
    enum: TaskStatus, 
    default: TaskStatus.TODO 
  })
  status: TaskStatus;

  @Column('date', { default: () => new Date() })
  createdAt: Date;

  @Column('date', { default: () => new Date() })
  updatedAt: Date;

  get id(): string {
    return this._id.toHexString();
  }
}