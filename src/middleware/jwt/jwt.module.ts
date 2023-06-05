import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const jwtModule = JwtModule.register({
    secret : process.env.JWT_SECRET,
    signOptions : { expiresIn : '1h' },
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
  providers : [JwtStrategy],
  exports : [passportMoudle,jwtModule,JwtStrategy]
})
export class AuthJwtModule {}