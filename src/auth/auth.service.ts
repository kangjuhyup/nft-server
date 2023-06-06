import { Injectable } from '@nestjs/common';
import { UserRepository } from '@root/database/user/user.repository';
import { SignUpDto } from '@auth/dto/signUp.dto';
import { UserInfo } from '@root/database/user/user.entity';
import { getPolicyDto } from '@auth/dto/getPolicy.dto';

import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    private readonly POLICY = '회원가입 약관 : 어쩌구 저쩌구 동의합니다.'

    constructor(
        private readonly userRepository : UserRepository,
        private readonly jwtService : JwtService
    ) {}

    async getPolicy(dto:getPolicyDto) {
        const {address} = dto;
        if(await this._isExisted(address)) throw new Error('already singup');
        return this.POLICY;
    }

    async signUp(dto:SignUpDto) {
        const {address, signature} = dto;
        if(await this._isExisted(address)){throw new Error('already singup')}
        if(!this._checkSignature(address,signature)){throw new Error('invaild signature')};
        const uuid = uuidv4();
        const jwt_access_token = this.jwtService.sign(dto);
        const user = new UserInfo(
            uuid,
            address,
            jwt_access_token
        )
        return await this.userRepository.upsert(user);
    }

    async _isExisted(address:string) {
        const check = await this.userRepository.findOne(address);
        console.log(check);
        if(check) return true;
        return false;
    }

    _checkSignature(address,signature) : boolean {
        if(address === ethers.verifyMessage(this.POLICY,signature)) return true;
        return false;
    }
}
