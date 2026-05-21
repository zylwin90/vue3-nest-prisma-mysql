import { IsString, IsInt } from 'class-validator';
export class LoginUserDto {
  @IsString({
    message: '密码不能为空',
  })
  password: string;

  @IsString({
    message: '邮箱不能为空',
  })
  email: string;
}
