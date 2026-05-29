import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    description: '用户邮箱',
    required: true,
  })
  @IsString({
    message: '邮箱不能为空',
  })
  email: string;

  @ApiProperty({
    description: '用户密码',
    required: true,
  })
  @IsString({
    message: '密码不能为空',
  })
  password: string;
}
