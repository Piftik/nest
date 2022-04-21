import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controlers/controller.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ControllerModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
