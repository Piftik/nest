import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MealsService} from "../services/meal.service";
import {Meal} from "../entity/meal.entity";
import {TodoRepository} from "../services/meal.repository";
import {UserEntity} from "../entity/user.entity";
import {UserRepository} from "../services/user.repository";
import {UserService} from "../services/user.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository, Meal, TodoRepository]),
        JwtModule.register({
            secret: 's3cr3t'
        }),
    ],
    providers: [UserService, MealsService],
    exports: [UserService, MealsService]
})
export class ServicesModule {}
