import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://vry1992.github.io', 'http://localhost:5173'],
  });
  await app.listen(3000);
}
bootstrap();
