import { Controller, Get, HttpException, HttpStatus, Query, Res } from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';


@Controller()
export class AppController {
  constructor(private readonly chatgptService: ChatGPTService) {}

  @Get("task")
  async getTasks(@Query('task') task, @Query('options') options): Promise<object> {
    const tasks  = await this.chatgptService.getTask(task, options);
    if(tasks == null) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return { tasks }
  }
}
