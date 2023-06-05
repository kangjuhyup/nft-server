import { IsEthereumAddress, IsString } from "class-validator";

export class SignUpDto {
    
    @IsEthereumAddress()
    address : string;

    @IsString()
    encrypted_message : string;

}