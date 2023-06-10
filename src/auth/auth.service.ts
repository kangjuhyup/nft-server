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
import path from 'path';
import { setPath, uploadFileURL, uploadPath } from '@root/middleware/multer/multer.options';
import { Response } from 'express';



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

    async signUp(res:Response,dto:SignUpDto) {
        const {address, signature} = dto;
        if(await this._isExisted(address)) throw new ExistedUserException();
        if(!this._checkSignature(address,signature)){throw new Error('invaild signature')};
        const uuid = uuidv4();
        console.log(dto);
        const jwt_access_token = this.jwtService.sign({address:dto.address,signature:dto.signature});
        const user = new UserInfo(
            uuid,
            address,
            jwt_access_token
        )
        await this.userRepository.upsert(user)
        res.setHeader('Authorization','Bearer '+jwt_access_token).cookie('jwt',jwt_access_token,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000
        }).send({
            success : true
        })
    
        return res;
    }

    async setInfo(file:Express.Multer.File,dto:SetInfoDto) {
        const { address, nickName} = dto;
        setPath(uploadPath);
        setPath(path.join(uploadPath,address));
        const fileName = `profile_${Date.now()}`
        fs.writeFileSync(path.join(uploadPath,address,fileName),JSON.stringify(file));
        if(nickName) 
        return uploadFileURL(path.join(uploadPath,address,fileName));
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
