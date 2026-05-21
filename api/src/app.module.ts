import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { TestModule } from './test/test.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './guards/passport-jwt-guard';

@Module({
  imports: [PrismaModule, UserModule, TodoModule, TestModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
