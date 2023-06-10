import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

const jwtModule = JwtModule.registerAsync({
    inject : [ConfigService],
    useFactory : (config : ConfigService) => ({
        secret : config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '1h' },

    })
})

const passportMoudle = PassportModule.register({
    defaultStrategy : 'jwt',
    session : false
})

@Module({
  imports : [
    passportMoudle,
    jwtModule,  
  ],
  providers : [
      JwtStrategy,
      JwtGuard
    ],
  exports : [
      passportMoudle,
      jwtModule,
      JwtStrategy,
      JwtGuard
    ]
})
export class AuthJwtModule {}
