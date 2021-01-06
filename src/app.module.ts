import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config = require('config');
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
