import { IsString, IsInt } from 'class-validator';
export class RegisterUserDto {
  @IsString({
    message: '账号不能为空',
  })
  name: string;

  @IsString({
    message: '密码不能为空',
  })
  password: string;

  @IsString({
    message: '邮箱不能为空',
  })
  email: string;
}
