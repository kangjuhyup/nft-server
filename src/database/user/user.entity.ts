import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserInfo {
    @PrimaryColumn()
    uuid : string;

    @Column()
    address : string;

    @Column()
    jwt_access_token : string;

    @Column({nullable:true})
    jwt_refresh_token : string;

    constructor(
        _uuid : string,
        _address : string,
        _jwt_access_token : string,
        _jwt_refresh_token? : string,
    ) {
        this.address = _address;
        this.uuid = _uuid;
        this.jwt_access_token = _jwt_access_token;
        if(_jwt_refresh_token) this.jwt_refresh_token = _jwt_refresh_token;
    } 
} 