import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGPTService } from './chatgpt.service';
import { FuzgramModule } from './fuzgram/fuzgram.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [FuzgramModule,MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest')],
  controllers: [AppController],
  providers: [AppService, ChatGPTService]
})
export class AppModule {}
