import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTudoDto, DetailTudoDto, EditTudoDto, ListTudoDto } from './dto';
import { success } from '@/utils';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  /**
   * 新增
   * @param data
   * @returns
   */
  async add(addTudo: CreateTudoDto, userId) {
    const res = await this.prisma.todo.create({
      data: {
        ...addTudo,
        userId,
      },
    });
    return success(res);
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
      where.name = { contains: name, mode: 'insensitive' };
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

    return success({ list: data, total });
  }

  /**
   * 详情
   * @param data
   * @returns
   */
  async detail(id: DetailTudoDto) {
    const res = await this.prisma.todo.findUnique({ where: id });
    return success(res);
  }

  /**
   * 编辑
   * @param data
   * @returns
   */
  async edit(data: EditTudoDto) {
    const res = await this.prisma.todo.update({
      data,
      where: { id: data.id },
    });
    return success(res);
  }

  /**
   * 删除
   * @param data
   * @returns
   */
  async del(id: DetailTudoDto) {
    const res = await this.prisma.todo.delete({ where: id });
    return success(res);
  }
}
