import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  name: string;

  @Column('string', { unique: true })
  username: string;

  @Column('string', { nullable: true })
  email: string;

  @Column({ nullable: true })
  teamId: string;

  @Column('date', { default: () => new Date() })
  createdAt: Date;

  @Column('date', { default: () => new Date() })
  updatedAt: Date;

  get id(): string {
    return this._id.toHexString();
  }
}