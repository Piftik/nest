import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meal } from './meal.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  login: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @ManyToMany(() => Meal, (meal) => meal.user)
  @JoinTable()
  meals: Meal[];
  // Связать таблицы
}
