import { OmitType } from '@nestjs/mapped-types';
import { EnumStatus } from '@prisma/client';

export class QuizWithIdDto {
  id: number;
  name: string;
  isPassed?: boolean;
  status?: EnumStatus;
  userId?: number;
}

export class QuizDto extends OmitType(QuizWithIdDto, ['id']) {}
