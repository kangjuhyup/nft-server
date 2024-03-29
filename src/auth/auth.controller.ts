import { Bind, Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignUpDto } from '@auth/dto/signUp.dto';
import { getPolicyDto } from './dto/getPolicy.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SetInfoDto } from './dto/setInfo.dto';
import { multerDiskOptions } from '@root/middleware/multer/multer.options';
import { JwtGuard } from '@root/middleware/jwt/jwt.guard';
import { Response } from 'express';
import { SignInDto } from './dto/signIn.dto';
import { GetInfoDto } from './dto/getInfo.dto';

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
        @Res() res:Response,
        @Body() dto:SignUpDto
    ) {
        return this.authService.signUp(res,dto);
    }

    @Post('signIn')
    async signIn(
        @Res() res:Response,
        @Body() dto:SignInDto
    ) {
        return this.authService.signIn(res,dto);
    }

    @Post('setInfo')
    @UseInterceptors(FileInterceptor('file', multerDiskOptions))
    @Bind(UploadedFile())
    @UseGuards(JwtGuard)
    async setInfo(
        @Res() res : Response,
        @UploadedFile() file : Express.Multer.File,
        @Body() dto:SetInfoDto
    ) {
        return this.authService.setInfo(res,file,dto);
    }

    @Get('getInfo')
    @UseGuards(JwtGuard)
    async getInfo(
        @Param() dto: GetInfoDto
    ) {
        return this.authService.getInfo(dto);
    }

}
