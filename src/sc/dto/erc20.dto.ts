import { Transform } from 'class-transformer';
import { IsBoolean, IsNumberString } from 'class-validator';
import { BaseDto } from './base.dto';

export class Erc20Dto extends BaseDto {
  @IsNumberString()
  totalSupply: string;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  mintable: boolean;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  burnable: boolean;
}
