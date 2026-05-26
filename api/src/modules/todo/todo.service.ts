import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTudoDto, DetailTudoDto, EditTudoDto, ListTudoDto } from './dto';
import { resultSuccess } from '@/utils';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  /**
   * 新增
   * @param data
   * @returns
   */
  async add(addTudo: CreateTudoDto, userId) {
    await this.prisma.todo.create({
      data: {
        ...addTudo,
        userId,
      },
    });
    return resultSuccess(null);
  }

  /**
   * 分页列表
   * @param data
   * @returns
   */
  async getList(listTudoDto: ListTudoDto, userId) {
    const { status, name, currentPage = 1, pageSize = 10 } = listTudoDto;

    const skip = (currentPage - 1) * pageSize;
    const where: any = {
      userId,
    };

    // 只有当 status 存在且不为 0 时才添加条件
    if (status !== 0) {
      where.status = status;
    }

    // name 条件
    if (name) {
      where.name = { contains: name };
    }

    // 查询数据
    const data = await this.prisma.todo.findMany({
      where,
      skip: skip, // 跳过的记录数
      take: pageSize, // 取多少条
      orderBy: {
        createTime: 'desc', // 排序
      },
    });

    // 查询总记录数（用于计算总页数）
    const total = await this.prisma.todo.count({
      where,
    });

    return resultSuccess({ list: data, total });
  }

  /**
   * 详情
   * @param data
   * @returns
   */
  async detail(id: DetailTudoDto) {
    const res = await this.prisma.todo.findUnique({ where: id });
    return resultSuccess(res);
  }

  /**
   * 编辑
   * @param data
   * @returns
   */
  async edit(data: EditTudoDto) {
    await this.prisma.todo.update({
      data,
      where: { id: data.id },
    });
    return resultSuccess(null);
  }

  /**
   * 删除
   * @param data
   * @returns
   */
  async del(id: DetailTudoDto) {
    await this.prisma.todo.delete({ where: id });
    return resultSuccess(null);
  }
}
