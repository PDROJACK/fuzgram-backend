import { Module, Post } from '@nestjs/common';
import { FuzgramController } from './fuzgram.controller';
import { FuzgramService } from './fuzgram.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';
import { UserSchema } from './user.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{ name: "post", schema: PostSchema },{ name: "user", schema: UserSchema}])],
  controllers: [FuzgramController],
  providers: [FuzgramService]
})
export class FuzgramModule {}
