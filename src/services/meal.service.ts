import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddMealDto } from 'src/commons/dto/meal/add-meal.dto';
import { Repository } from 'typeorm';
import {  Meal } from '../entity/meal.entity'

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}

  findAll(): Promise<Meal[]> {
    return this.mealsRepository.find();
  }

  findOne(id: string): Promise<Meal> {
    return this.mealsRepository.findOne(id);
  }

   save(meal: Meal): Promise<Meal> {
       delete meal.id;
    return  this.mealsRepository.save(meal)
}

 update(meal: Meal): Promise<Meal> {
  
   
 return  this.mealsRepository.save(meal)
}

  async remove(id: string): Promise<void> {
    await this.mealsRepository.delete(id);
  }
}