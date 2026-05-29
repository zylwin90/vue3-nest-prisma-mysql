// dto/todo-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class TodoResponseDto {
  @ApiProperty({
    description: '待办ID',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: '待办标题',
    example: '完成项目报告',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: '状态（0:全部, 1:未完成, 2:已完成）',
    example: 1,
    enum: [0, 1, 2],
  })
  status: number;

  @ApiProperty({
    description: '优先级',
    example: 3,
    minimum: 1,
    maximum: 5,
  })
  priority: number;

  @ApiProperty({
    description: '备注',
    example: '需要包含数据分析部分',
    required: false,
    nullable: true,
  })
  remark: string | null;

  @ApiProperty({
    description: '创建时间',
    example: '2024-01-15T10:30:00Z',
    type: String,
    format: 'date-time',
  })
  createTime: Date;

  @ApiProperty({
    description: '更新时间',
    example: '2024-01-15T10:30:00Z',
    type: String,
    format: 'date-time',
  })
  updateTime: Date;
}
