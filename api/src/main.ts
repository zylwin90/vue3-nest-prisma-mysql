import 'dotenv/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@/pipes/validation.pipe';
import { AllExceptionsFilter } from '@/common/filters/all-exception.filter';
import { HttpExceptionsFilter } from '@/common/filters/http-exception.filter';
import { RolesGuard } from '@/common/guards/auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局（验证参数）管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //自动将负载转换为根据其 DTO 类类型化的对象
      disableErrorMessages: false, //禁用错误信息
    }),
  );

  // 错误异常捕获 和 过滤处理
  // app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new HttpExceptionsFilter());

  // 全局守卫 需手动传入 reflector （这种不推荐）
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new RolesGuard(reflector));

  // Swagger 配置
  const config = new DocumentBuilder()
    .setTitle('nestjs demo')
    .setDescription('用户nestjs框架测试文档')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
