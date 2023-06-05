import { Module } from "@nestjs/common";
import { UserRepository } from "@database/user/user.repository";
import { UserProvider } from "@database/user/user.provider";

@Module({
    providers: [
        UserRepository,
        ...UserProvider,
    ],
  })
  export class UserModule {}
  