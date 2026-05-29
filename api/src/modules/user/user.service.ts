import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ListDto } from './dto';
import { UserStaus } from '@/enums/user';
import { resultSuccess } from '@/utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: ListDto) {
    const { status, name, currentPage = 1, pageSize = 20 } = query;

    const skip = (currentPage - 1) * pageSize;
    const where: any = {};

    // 只有当 status 存在且不为 0 时才添加条件
    if (status !== UserStaus.ALL) {
      where.status = status;
    }

    // name 条件
    if (name) {
      where.name = { contains: name };
    }

    // 查询数据
    const data = await this.prisma.user.findMany({
      where,
      skip: skip, // 跳过的记录数
      take: pageSize, // 取多少条
      orderBy: {
        createTime: 'desc', // 排序
      },
    });

    // 查询总记录数（用于计算总页数）
    const total = await this.prisma.user.count({
      where,
    });

    return resultSuccess({ list: data, total });
  }

 
}
