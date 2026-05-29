import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserModule } from '@/modules/user/user.module';
import { TodoModule } from '@/modules/todo/todo.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from '@/common/guards/auth.guard';
import { JwtAuthGuard } from '@/common/guards/passport-jwt-guard';
import { SuccessInterceptor } from '@/common/interceptors/success.interceptor';
import { LoggerMiddleware } from './common/middlewares/log';
import { FunMiddleware } from './common/middlewares/fun';
import { AuthModule } from '@/modules/auth/auth.module';
@Module({
  imports: [PrismaModule, UserModule, TodoModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 不能使用这个统一处理吧
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: SuccessInterceptor,
    // },
  ],
})

// 应用中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, FunMiddleware).forRoutes('*');
  }
}
