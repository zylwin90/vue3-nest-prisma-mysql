import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { err, success } from '@/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/decorators/use.decorator';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  /**
   * login
   */

  async login(userDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });

    // 没有这个用户
    if (!user) return err('用户不存在');

    // 判断密码是否正确
    if (userDto.password != user.password) return err('密码错误');

    // 生产token
    const payload = { username: user.name, sub: user.id };
    const token = this.jwt.sign(payload);
    const data = {
      access_token: token,
      userInfo: user,
    };
    return success(data);
  }

  /**
   * 注册
   * @param userDto
   * @returns
   */
  async register(userDto: RegisterUserDto) {
    const res = await this.prisma.user.create({
      data: userDto,
    });
    return success(res);
  }

  /**
   * 用户详情
   */
  getUserInfo(@User() user: any) {
    return success(user);
  }
}
