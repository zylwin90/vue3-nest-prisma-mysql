import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateTestDto, Demo } from './create-test.dto';

export class UpdateTestDto extends PartialType(CreateTestDto) {}
export class PickTestDto extends PickType(CreateTestDto, ['age', 'name']) {}
export class OmitTestDto extends OmitType(CreateTestDto, ['age']) {}
export class InterTestDto extends IntersectionType(CreateTestDto, Demo) {}
