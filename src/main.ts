import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CustomConfigService } from './config/config.service';
import { SwaggerHelper } from './common/swagger.helper';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: CustomConfigService =
    app.get<CustomConfigService>(CustomConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  //swagger
  const config = new DocumentBuilder()
    .setTitle('AutoRiaClone')
    .setDescription('Description Project')
    .setVersion('1.0.')
    .addTag('autoRia-clone')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerHelper.setDefaultResponses(document);

  await app.listen(appConfig.app_port, () => {
    Logger.log(`http://${appConfig.app_host}:${appConfig.app_port}/api`, 'Doc');
  });
}
bootstrap();
