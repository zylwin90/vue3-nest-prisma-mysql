import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChangeDto, ListDto } from './dto';
import { UserStaus } from '@/enums/user';
import { resultFail, resultSuccess } from '@/utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   *
   * 查询全部
   * @returns
   */
  async findAll(query: ListDto) {
    const { status, name, currentPage = 1, pageSize = 20 } = query;

    const skip = (currentPage - 1) * pageSize;
    const where: any = {};

    if (status !== UserStaus.ALL) {
      where.status = status;
    }

    if (name) {
      where.name = { contains: name };
    }

    const data = await this.prisma.user.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        createTime: 'desc',
      },
      include: {
        role: {
          select: { name: true },
        },
      },
    });

    const total = await this.prisma.user.count({
      where,
    });

    const list = data.map(({ role, ...user }) => ({
      ...user,
      roleName: role.name,
    }));

    return resultSuccess({ list, total });
  }

  /**
   * 删除
   * @returns
   */
  async del(id: number, userId: number) {
    const todoTotal = await this.prisma.todo.count({
      where: { userId },
    });
    if (todoTotal > 0) return resultFail('此用户不能删除，账号下存在todo数据');

    await this.prisma.user.delete({
      where: { id },
    });
    return resultSuccess(null);
  }

  /**
   * 跟新
   * @returns
   */
  async update(data: ChangeDto) {
    await this.prisma.user.update({
      data,
      where: { id: data.id },
    });
    return resultSuccess(null);
  }
}
