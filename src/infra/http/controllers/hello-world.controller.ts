import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloWorldController {
  @Get()
  async hello() {
    return { greetings: 'Hello world!', };
  }
}
