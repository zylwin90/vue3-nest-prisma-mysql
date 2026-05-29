import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ChangeDto, ListDto } from './dto';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getList')
  findAll(@Query() req: ListDto) {
    return this.userService.findAll(req);
  }

  @Delete('del/:id')
  del(@Param('id') id: number, @Req() req: Request) {
    return this.userService.del(id, req.user.userId);
  }

  @Patch('update')
  update(@Body() req: ChangeDto) {
    return this.userService.update(req);
  }
}
