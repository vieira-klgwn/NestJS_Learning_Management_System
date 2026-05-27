import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  app.useLogger(['error', 'warn', 'debug', 'log', 'verbose']);
  await app.listen(3000);
}
bootstrap();
