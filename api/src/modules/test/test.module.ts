import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';

import { MyClass } from './my-class';
import { TodoService } from '../todo/todo.service';
import { TodoModule } from '../todo/todo.module';
import { InterTestDto, OmitTestDto, PickTestDto, UpdateTestDto } from './dto/update-test.dto';

class Doy {
  private name: string;

  constructor(name) {
    this.name = name;
  }

  sayHello = (): string => {
    return `Hello, my name is ${this.name}`;
  };

  add(data:InterTestDto) {
    
  }
}

@Module({
  controllers: [TestController],
  imports: [],
  providers: [
    {
      provide: MyClass,
      useClass: Doy,
    },
    {
      provide: 'Test',
      useValue: {
        data: [{ name: 1, age: 30 }],
      },
    },
    {
      provide: 'fac',
      async useFactory() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ name: 'zylwin' });
          }, 2000);
        });
      },
    },
  ],
})
export class TestModule {}
