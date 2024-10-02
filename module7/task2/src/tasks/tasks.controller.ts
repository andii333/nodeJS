import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class TasksController {
  @UseGuards(JwtAuthGuard)
  @Get('task')
  getTasks(@Request() req) {
    return `Tasks for user: ${req.user.username}`;
  }
}
