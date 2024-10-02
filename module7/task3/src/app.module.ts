import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoogleOauthGuard } from './google-oauth.guard';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [GoogleOauthStrategy, GoogleOauthGuard],
})
export class AppModule {}
