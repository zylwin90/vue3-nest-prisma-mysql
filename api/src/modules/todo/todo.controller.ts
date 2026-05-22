import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTudoDto, DetailTudoDto, EditTudoDto, ListTudoDto } from './dto';
import type { Request } from 'express';
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * 新增
   */
  @Post('add')
  add(@Body() createTodo: CreateTudoDto, @Req() req: Request) {
    return this.todoService.add(createTodo, req.user.userId);
  }

  /**
   * list
   */
  @Get('getList')
  getList(@Query() query: ListTudoDto, @Req() req: Request) {
    return this.todoService.getList(query, req.user.userId);
  }

  /**
   * 编辑
   */
  @Put('edit')
  edit(@Body() req: EditTudoDto) {
    return this.todoService.edit(req);
  }

  /**
   * 删除
   */
  @Delete('del/:id')
  del(@Param() params: DetailTudoDto) {
    return this.todoService.del(params);
  }

  /**
   * 详情
   */
  @Get('detail/:id')
  detail(@Param() params: DetailTudoDto) {
    return this.todoService.detail(params);
  }
}
