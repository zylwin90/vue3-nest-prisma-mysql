import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/passport-jwt-guard';
import { Public } from '@/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 登录
   * @param userDto
   * @returns
   */
  // @Roles(['admin'])
  @Public()
  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.userService.login(userDto);
  }

  /**
   * 注册
   * @param userDto
   * @returns
   */
  // @Roles(['admin'])
  @Public()
  @Post('register')
  register(@Body() userDto: RegisterUserDto) {
    return this.userService.register(userDto);
  }

  /**
   * 用户详情
   * @param userDto
   * @returns
   */
  // @Roles(['admin'])
  @UseGuards(JwtAuthGuard)
  @Get('getUserInfo')
  getUserInfo() {
    return this.userService.getUserInfo({ name: 'zyl' });
  }
}
