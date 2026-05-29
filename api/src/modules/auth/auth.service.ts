import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { resultFail, resultSuccess } from '@/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLineStaus, UserStaus } from '@/enums/user';

@Injectable()
export class AuthService {
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
    if (!user) return resultFail('用户不存在');

    // 判断密码是否正确
    if (userDto.password != user.password) return resultFail('密码错误');

    // 如果被禁用，不能登录
    if (user.status === UserStaus.Disable)
      return resultFail('当前用户禁用，不能登录！');

    // 设置用户在线状态
    await this.prisma.user.update({
      data: { line: UserLineStaus.Online },
      where: { email: userDto.email },
    });

    // 生产token
    const payload = { username: user.name, sub: user.id };
    const token = this.jwt.sign(payload);

    return resultSuccess({
      access_token: token,
      userInfo: user,
    });
  }

  /**
   * 注册
   * @param userDto
   * @returns
   */
  async register(userDto: RegisterUserDto) {
    await this.prisma.user.create({
      data: userDto,
    });
    return resultSuccess(null);
  }
}
