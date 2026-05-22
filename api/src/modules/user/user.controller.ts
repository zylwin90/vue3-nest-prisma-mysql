import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/passport-jwt-guard';
import { Public } from '@/common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { success } from '@/utils';
import { TodoResponseDto } from './dto/test.dto';
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 登录
   * @param userDto
   * @returns
   */
  // @Roles(['admin'])
  @ApiOperation({ summary: '用户登录接口' })
  @Public()
  @Post('login')
  @ApiResponse({
    description: '创建成功',
    type: TodoResponseDto,
    example: {
      id: 1,
      name: '完成项目报告',
      status: 1,
      priority: 3,
      remark: '需要包含数据分析部分',
      createTime: '2024-01-15T10:30:00Z',
      updateTime: '2024-01-15T10:30:00Z',
    },
  })
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
