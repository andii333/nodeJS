import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ limit: 2, ttl: seconds(60) }],
      storage: new ThrottlerStorageRedisService(),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
