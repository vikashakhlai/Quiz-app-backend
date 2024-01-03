import { IsArray, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  image?: string;
  video?: string;
  @IsString()
  question: string;
  @IsArray()
  answer_options: string[];
  @IsArray()
  answer: string[];
  quizId?: number;
}

export class QuestionWithIdDto extends QuestionDto {
  @IsNumber()
  id: number;
}
