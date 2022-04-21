import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddMealDto } from 'src/commons/dto/meal/add-meal.dto';
import { EditMealDto } from 'src/commons/dto/meal/edit-meal.dto';
import { Meal } from 'src/entity/meal.entity';
import { MealsService } from 'src/services/meal.service';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealsService) {}

  @Get('/getAll')
  getAllMeals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Get(':id')
  getOneMeal(@Param('id') id: string): Promise<Meal> {
    console.log(id);

    return this.mealService.findOne(id);
  }

  @Post('/add')
  addMeal(@Body() addMealDto: AddMealDto): Promise<Meal> {
    const meal = new Meal();

    meal.name = addMealDto.name;
    meal.ingrid = addMealDto.ingrid;
    meal.cooking = addMealDto.cooking;
    meal.teg = addMealDto.teg;
    meal.img = addMealDto.img;
    console.log(meal.img, 'meal img');

    return this.mealService.save(meal);
  }

  @Put(':id')
  async editMeal(
    @Param('id') id: string,
    @Body() { name, ingrid, cooking, teg, img }: EditMealDto,
  ): Promise<Meal> {
    const meal = await this.mealService.findOne(id);
    if (meal === undefined) {
      throw new NotFoundException('Meal not found');
    }
    meal.name = name;
    meal.ingrid = ingrid;
    meal.cooking = cooking;
    meal.teg = teg;
    meal.img = img;
    return this.mealService.update(meal);
  }

  @Delete(':id')
  deleteMeal(@Param('id') id: string): Promise<void> {
    return this.mealService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
