import { IsEthereumAddress, IsString } from "class-validator";

export class BaseDto {
    @IsEthereumAddress()
    owner: string;
  
    @IsString()
    name: string;
  
    @IsString()
    symbol: string;
}