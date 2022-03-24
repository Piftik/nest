import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from 'src/entity/meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  
  controllers: [],
  providers: [],
})
export class MealModule {}
