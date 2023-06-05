import { Module } from '@nestjs/common';
import { UserModule } from '@database/user/user.module';

@Module({
    imports : [
        UserModule
    ],
    exports : [
        UserModule
    ]
})
export class DatabaseModule {}