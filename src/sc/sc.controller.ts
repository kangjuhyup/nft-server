import { Controller, Get, Query } from '@nestjs/common';
import { Erc20Dto } from './dto/erc20.dto';
import { ScService } from './sc.service';

@Controller('sc')
export class ScController {
    constructor(
        private readonly scService : ScService
    ){}

    @Get('erc20')
    async getErc20Template(
        @Query() dto: Erc20Dto
    ) {
        return this.scService.getErc20Template(dto);
    }
}
