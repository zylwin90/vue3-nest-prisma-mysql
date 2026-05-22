import { Module } from '@nestjs/common';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
import { TodoModule } from '@/modules/todo/todo.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/common/guards/auth.guard';
import { JwtAuthGuard } from '@/common/guards/passport-jwt-guard';

@Module({
  imports: [PrismaModule, UserModule, TodoModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
