import { Bind, Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignUpDto } from '@auth/dto/signUp.dto';
import { getPolicyDto } from './dto/getPolicy.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SetInfoDto } from './dto/setInfo.dto';
import { multerDiskOptions } from '@root/middleware/multer/multer.options';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Get('getPolicy')
    async getPolicy(
        @Query() dto: getPolicyDto
    ) {
        return this.authService.getPolicy(dto);
    }

    @Post('signUp')
    async signeUp(
        @Body() dto:SignUpDto
    ) {
        return this.authService.signUp(dto);
    }

    @Post('setInfo')
    @UseInterceptors(FileInterceptor('file', multerDiskOptions))
    @Bind(UploadedFile())
    async setInfo(
        file: any,
        @Body() dto:SetInfoDto
    ) {
        return this.authService.setInfo(file,dto);
    }

}
