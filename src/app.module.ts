import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AuthJwtModule } from './middleware/jwt/jwt.module';
import { ScModule } from './sc/sc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    DatabaseModule,
    AuthJwtModule,
    AuthModule,
    ScModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
