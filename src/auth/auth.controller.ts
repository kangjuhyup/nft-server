import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService AuthService,
    ) {}

    @Post('sigeUp')
    async signUp(
        return AuthService.
    )

}
