import { Injectable } from '@nestjs/common';
import { UserRepository } from '@root/database/user/user.repository';
import { SignUpDto } from '@auth/dto/signUp.dto';
import { UserInfo } from '@root/database/user/user.entity';
import { getPolicyDto } from '@auth/dto/getPolicy.dto';
import { JwtService } from '@nestjs/jwt';
import { ExistedUserException } from '@root/middleware/exception/custom/existedUser.exception';
import { SetInfoDto } from './dto/setInfo.dto';

import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import * as fs from 'fs';
import path, { extname } from 'path';
import { uploadFileURL } from '@root/middleware/multer/multer.options';



@Injectable()
export class AuthService {

    private readonly POLICY = '회원가입 약관 : 어쩌구 저쩌구 동의합니다.'

    constructor(
        private readonly userRepository : UserRepository,
        private readonly jwtService : JwtService
    ) {}

    async getPolicy(dto:getPolicyDto) {
        const {address} = dto;
        if(await this._isExisted(address)) throw new ExistedUserException();
        return {
            success : true, 
            policy : this.POLICY 
        };
    }

    async signUp(dto:SignUpDto) {
        const {address, signature} = dto;
        if(await this._isExisted(address)) throw new ExistedUserException();
        if(!this._checkSignature(address,signature)){throw new Error('invaild signature')};
        const uuid = uuidv4();
        const jwt_access_token = this.jwtService.sign(dto);
        const user = new UserInfo(
            uuid,
            address,
            jwt_access_token
        )
        return {
            success : true,
            user : await this.userRepository.upsert(user)
        }
    }

    async setInfo(file:any, dto:SetInfoDto) {
        const {address} = dto;
        const fileName = `${address}_${Date.now()}_${file.filename}`
        return uploadFileURL(fileName);
    }

    async _isExisted(address:string) {
        const check = await this.userRepository.findOne(address);
        if(check) return true;
        return false;
    }

    _checkSignature(address,signature) : boolean {
        if(address === ethers.verifyMessage(this.POLICY,signature)) return true;
        return false;
    }
}
