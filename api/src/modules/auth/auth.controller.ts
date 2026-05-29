import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录
   * @param userDto
   * @returns
   */
  // @Roles(['admin'])
  @ApiOperation({ summary: '用户登录接口' })
  @Public()
  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
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
    return this.authService.register(userDto);
  }
}
