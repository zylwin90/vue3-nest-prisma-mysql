import { Controller, Inject, Post, Req } from '@nestjs/common';
import { MyClass } from './my-class';
import { TestService } from './test.service';
import { TodoService } from '../todo/todo.service';
import type { Request } from 'express';
@Controller('test')
export class TestController {
  constructor(
    @Inject('fac') private TestService: any,
    private myClass: MyClass,
    @Inject('Test') private test: any,
    private todoService: TodoService,
  ) {}

  @Post('getList')
  getList(@Req() req: Request) {
    // return this.myClass.sayHello();
    
    
    return this.todoService.getList({ status: 0, name: '' }, req.user.userId);
  }
}
