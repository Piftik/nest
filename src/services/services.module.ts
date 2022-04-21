import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MealsService} from "./meal.service";
import {Meal} from "../entity/meal.entity";
import {MealRepository} from "./meal.repository";
import {UserEntity} from "../entity/user.entity";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository, Meal, MealRepository]),
        JwtModule.register({
            secret: 's3cr3t'
        }),
    ],
    providers: [UserService, MealsService],
    exports: [UserService, MealsService]
})
export class ServicesModule {}
