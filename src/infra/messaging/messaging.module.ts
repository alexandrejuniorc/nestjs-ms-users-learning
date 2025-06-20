/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Global, Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [
    RedisModule
  ],
  providers: [],
  exports: [],
})
export class MessagingModule { }
