import { DataSource } from "typeorm";
import { User } from "@root/database/user/user.entity";

export const UserProvider = [
    {
        provide : 'USER_REPOSITORY',
        useFactory : (ds:DataSource) => ds.getRepository(User),
        inject : ['DATA_SOURCE'],
    }
]