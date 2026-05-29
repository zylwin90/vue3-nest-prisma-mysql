import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { UserStaus, UserLineStaus } from '@/enums/user';

/**
 * 列表
 */
export class ListDto {
  @IsOptional()
  @IsString()
  name?: string = '';

  @Type(() => Number)
  @IsNumber()
  status: number = UserStaus.ALL;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  currentPage?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number = 20;
}
