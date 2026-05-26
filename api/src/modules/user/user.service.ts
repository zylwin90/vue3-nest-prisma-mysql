import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/common/decorators/use.decorator';
import { resultFail, resultSuccess } from '@/utils';
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
    if (!user) return resultFail('用户不存在');

    // 判断密码是否正确
    if (userDto.password != user.password) return resultFail('密码错误');

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

  /**
   * 用户详情
   */
  getUserInfo(@User() user: any) {
    return user;
  }
}
