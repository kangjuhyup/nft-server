import { IsEthereumAddress, IsString } from "class-validator";

export class SetInfoDto {
    
    @IsEthereumAddress()
    address : string;


    

}