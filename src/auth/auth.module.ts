import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { DatabaseModule } from '@root/database/database.module';
import { AuthJwtModule } from '@root/middleware/jwt/jwt.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  imports : [
    DatabaseModule,
    AuthJwtModule,
  ]
})
export class AuthModule {}
