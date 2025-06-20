import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'REDIS_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const redisHost = configService.get('REDIS_HOST')!;
          const redisUser = configService.get('REDIS_USER')!;
          const redisPW = configService.get('REDIS_PW')!;
          const redisPort = configService.get('REDIS_PORT')!;

          return {
            transport: Transport.REDIS,
            options: {
              host: redisHost,
              port: redisPort,
              username: redisUser,
              password: redisPW,
            },
          };
        },
      },
    ]),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule { }
