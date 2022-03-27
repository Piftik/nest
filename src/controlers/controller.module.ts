import { Module } from '@nestjs/common';
import {MealController} from './meal.controller';
import {UserController} from "./user.controller";
import {ServicesModule} from "../module/services.module";
import {PassportModule} from "../lib";
import {LocalStrategy} from "./auth/local.strategy";
import {JwtStrategy} from "./auth/jwt.strategy";

@Module({
    imports: [
        ServicesModule,
        PassportModule.register({})
    ],
    controllers: [MealController, UserController],
    providers: [LocalStrategy, JwtStrategy]
})
export class ControllerModule {}
