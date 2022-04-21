import { Blob } from 'buffer';
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

  @Column()
  img?: string;
  // @Column({ type: 'mediumblob' })
  // img?: Buffer;
  // @Column({ type: 'mediumblob' })
  // img?: Blob;

  @Column({ default: false })
  isLike?: boolean;

  @ManyToMany(() => UserEntity, (user) => user.meals)
  @JoinTable()
  user: UserEntity;
}
