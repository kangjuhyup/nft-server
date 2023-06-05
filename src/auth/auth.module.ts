import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { DatabaseModule } from '@root/database/database.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports : [DatabaseModule]
})
export class AuthModule {}
