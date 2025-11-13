import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('teams')
export class Team {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  name: string;

  @Column('string', { nullable: true })
  description: string;

  @Column('date', { default: () => new Date() })
  createdAt: Date;

  @Column('date', { default: () => new Date() })
  updatedAt: Date;

  get id(): string {
    return this._id.toHexString();
  }
}