import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter);

  app.useGlobalInterceptors(new TransformInterceptor);

  app.useGlobalPipes(new ValidationPipe({
    transform:            true,
    whitelist:            true,
    forbidNonWhitelisted: true,
  }));

  const config = (new DocumentBuilder)
    .setTitle('10th Highthon API')
    .addBearerAuth()
    .build();

  const theme = new SwaggerTheme;
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/docs/json',
    yamlDocumentUrl: '/docs/yaml',
    explorer:        true,
    customCss:       theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
    customSiteTitle: '10th Highthon API',
  });

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
