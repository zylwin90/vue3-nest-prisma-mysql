import 'dotenv/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { AllExceptionsFilter } from '@/filters/all-exception.filter';
import { HttpExceptionsFilter } from '@/filters/http-exception.filter';
import { RolesGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局（验证参数）管道
  app.useGlobalPipes(new ValidationPipe());

  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new HttpExceptionsFilter());

  // 全局守卫 需手动传入 reflector （这种不推荐）
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
