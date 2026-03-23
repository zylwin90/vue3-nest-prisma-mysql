import { Body, Injectable, Param } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) { }
  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto
    })
  }

  findAll() {
    return this.prisma.todo.findMany()
  }

  findOne(@Param('id') id: number) {
    return this.prisma.todo.findUnique({
      where: { id }
    })
  }

  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto
    })
  }

  remove(@Param('id') id: number) {
    return this.prisma.todo.delete({
      where: { id },
    })
  }
}
