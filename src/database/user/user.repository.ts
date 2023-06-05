import { Inject, Injectable } from '@nestjs/common';
import { User } from '@root/database/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<User>,
  ) {}

  upsert(user: User): Promise<User> {
    return this.repository.save(user).catch((err) => {
      throw err;
    });
  }

  findOne(address: string): Promise<User> {
    return this.repository.findOne({
      where: {
        address,
      },
    });
  }
}
