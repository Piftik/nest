import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddMealDto } from 'src/commons/dto/meal/add-meal.dto';
import { EditMealDto } from 'src/commons/dto/meal/edit-meal.dto';
import { Meal } from 'src/entity/meal.entity';
import { MealsService } from 'src/services/meal.service';

@Controller('rest/meal')
export class MealController {
  constructor(private readonly mealService: MealsService) {}

  @Get()
  getAllMeals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Get(':id')
  getOneMeal(@Param('id') id: string): Promise<Meal> {
    return this.mealService.findOne(id);
  }

  @Post()
  addMeal(@Body() addMealDto: AddMealDto): Promise<Meal> {
    const meal = new Meal();
    meal.name = addMealDto.name;
    meal.ingrid = addMealDto.ingrid;
    meal.cooking = addMealDto.cooking;
    meal.teg = addMealDto.teg;
    return this.mealService.save(meal);
  }

  @Put(':id')
  async editMeal(
    @Param('id') id: string,
    @Body() { name, ingrid, cooking, teg }: EditMealDto,
  ): Promise<Meal> {
    const meal = await this.mealService.findOne(id);
    if (meal === undefined){
      throw new NotFoundException('Meal not found')
    }
    meal.name = name;
    meal.ingrid = ingrid;
    meal.cooking = cooking;
    meal.teg = teg;
    return this.mealService.update(meal);
  }

  @Delete(':id')
  deleteMeal(@Param('id') id: string): Promise<void> {
    return this.mealService.remove(id);
  }
}
