import { IsString } from "class-validator";
import { BaseDto } from "./base.dto";


export class Erc721Dto extends BaseDto {

    @IsString()
    baseUrl:string;
}