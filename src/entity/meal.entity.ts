import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  ingrid: string;

  @Column('text')
  cooking: string;

  @Column()
  teg?: string;

  @Column({ default: false })
  isLike?: boolean;

  // @ManyToMany(() => UserEntity, (user) => user.id, { nullable: true })
  // @JoinTable()
  // user: UserEntity;
}
