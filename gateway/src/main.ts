import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(4003).then(() => {
    console.log('[Gateway] HTTP server on port 4003');
  })
}
bootstrap();
