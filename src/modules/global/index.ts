import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

export const globalModules = [
  PrismaModule,
  ConfigModule.forRoot(),
  PubSubModule,
];
