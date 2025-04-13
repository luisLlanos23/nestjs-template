/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateBaseDto {
  // @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
export class UpdateBaseDto {
  // @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
