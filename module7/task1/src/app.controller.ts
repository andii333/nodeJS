import { Controller, Get } from '@nestjs/common';
// import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  // @Throttle({ default: { limit: 2, ttl: 60000 } })
  @Get()
  getHello(): string {
    return 'Hello';
  }
}
