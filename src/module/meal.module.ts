import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealController } from 'src/controlers/meal.controller';
import { Meal } from 'src/entity/meal.entity';
import { MealsService } from 'src/services/meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  
  controllers: [MealController],
  providers: [MealsService],
})
export class MealModule {}
