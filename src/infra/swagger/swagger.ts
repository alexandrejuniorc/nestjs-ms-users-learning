import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const addSwagger = (app: INestApplication) => {
  const configService = app.get<ConfigService>(ConfigService);

  const appName = configService.get<string>('API_NAME')!;
  const apiDescription = configService.get<string>('API_DESCRIPTION')!;
  const apiServer = configService.get<string>('API_SERVER')!;
  const apiVersion = configService.get<string>('API_VERSION')!;
  const appTags = configService.get<string>('API_TAGS')!;

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(apiDescription)
    .addServer(apiServer)
    .setVersion(apiVersion)
    .addTag(appTags);

  const configBuilded = config.build();

  const document = SwaggerModule.createDocument(app, configBuilded);

  SwaggerModule.setup('docs', app, document);
};
