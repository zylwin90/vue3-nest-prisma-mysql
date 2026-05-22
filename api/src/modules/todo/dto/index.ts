import {
  IsNumber,
  IsString,
  IsOptional,
  Min,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 新增
 */
export class CreateTudoDto {
  @IsString({
    message: 'tuto名称不能为空',
  })
  name: string;
}

/**
 * 列表
 */
export class ListTudoDto {
  @IsOptional()
  @IsString()
  name?: string = '';

  @Type(() => Number)
  @IsNumber()
  status: number = 0;

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

/**
 * 编辑
 */
export class EditTudoDto {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  status: number;

  @IsOptional()
  @IsString()
  remark: string;
}

/**
 * 详情
 */
export class DetailTudoDto {
  @Type(() => Number) // 自动转换字符串为数字
  @IsInt({ message: 'ID 必须是整数' })
  @IsPositive({ message: 'ID 必须是正数' })
  @Min(1, { message: 'ID 不能小于1' })
  id: number;
}
