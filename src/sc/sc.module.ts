import { Module } from '@nestjs/common';
import { ScController } from './sc.controller';
import { ScService } from './sc.service';

@Module({
  providers: [ScService],
  controllers : [ScController]
})
export class ScModule {}
