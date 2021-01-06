import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config = require('config');

const PORT = config.get('port') ?? 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`App has been started on port ${PORT}...`);
  await app.listen(PORT);
}
bootstrap().catch((error) => console.log(error));
