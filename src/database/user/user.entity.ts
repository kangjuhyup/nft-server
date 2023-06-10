import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserInfo {
    @PrimaryColumn()
    uuid : string;

    @Column()
    address : string;

    @Column({nullable:true})
    nick_name : string;

    @Column({nullable:true})
    profile : string;

    @Column()
    jwt_access_token : string;

    @Column({nullable:true})
    jwt_refresh_token : string;

    constructor(
        _uuid : string,
        _address : string,
        _jwt_access_token : string,
        _jwt_refresh_token? : string,
        _nick_name? : string,
        _profile? : string,
    ) {
        this.address = _address;
        this.uuid = _uuid;
        this.jwt_access_token = _jwt_access_token;
        if(_jwt_refresh_token) this.jwt_refresh_token = _jwt_refresh_token;
        if(_nick_name) this.nick_name = _nick_name
        if(_profile) this.profile = _profile
    } 
} 