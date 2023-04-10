import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class ChatGPTService implements OnModuleInit {
  private kpi: any = 0;

  async onModuleInit() {
    const chatgpt = await import('chatgpt');
    this.kpi = new chatgpt.ChatGPTAPI({
      apiKey: "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"
    })
  }

  async getTask(task: string, options: any): Promise<string[]> {
    
    const resp = await this.kpi.sendMessage(task);

    console.log(resp.text.split("\n"));

    return resp.text.split("\n");
  }
}