import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}