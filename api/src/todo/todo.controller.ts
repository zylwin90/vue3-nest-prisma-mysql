import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const data = await this.todoService.create(createTodoDto)
    return {
      code: 1,
      data
    }
  }

  @Get()
  async findAll() {
    const data = await this.todoService.findAll()
    return {
      code: 1,
      data
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.todoService.findOne(+id)
    return {
      code: 1,
      data
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const data = await this.todoService.update(+id, updateTodoDto)
    return {
      code: 1,
      data
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.todoService.remove(+id)
    return {
      code: 1,
      data
    }
  }
}
