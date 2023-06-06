import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignUpDto } from '@auth/dto/signUp.dto';
import { getPolicyDto } from './dto/getPolicy.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Get('getPolicy')
    async getPolicy(
        @Query() dto: getPolicyDto
    ) {
        // return 'ok'
        return this.authService.getPolicy(dto);
    }

    @Post('signUp')
    async signeUp(
        @Body() dto:SignUpDto
    ) {
        console.log('controller dto :',dto);
        return this.authService.signUp(dto);
    }

}
