import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { FuzgramService } from './fuzgram.service';
import { Headers } from '@nestjs/common';
import { PostDocument } from './post.schema';

@Controller('/')
export class FuzgramController {

    constructor(private readonly fuzgramService: FuzgramService) {}

    @Get("/setup")
    setUpInstagramIntegration(@Body() body, @Headers() headers): string {
      const tasks  = this.fuzgramService.storePosts();
    //   if(tasks == null) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      return "success"
    }

    @Get("/:username/:social")
    async getPostsBySocialUsername(@Param() params): Promise<PostDocument[]> {
        return this.fuzgramService.getPosts(params.username, params.social)
    }

    @Get("/search")
    async getSearch(@Query() params): Promise<PostDocument[]> {
        return this.fuzgramService.search(params.username, params.socialUsername, params.keyword)
    }



}
