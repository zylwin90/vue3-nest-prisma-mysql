import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [PrismaModule, UserModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
