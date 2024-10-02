import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './google-oauth.guard';
@Controller()
export class AppController {
  @Get('auth/google/callback')
  @UseGuards(GoogleOauthGuard)
  getUser() {
    return 'User data';
  }

  @Get('user')
  getUsers() {
    return 'User data';
  }
}
