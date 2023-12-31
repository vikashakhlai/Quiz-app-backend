import { IsArray, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  image?: string;
  @IsString()
  video?: string;
  @IsString()
  question: string;
  @IsArray()
  answer_options: string[];
  @IsArray()
  answer: string[];
}

export class QuestionWithIdDto extends QuestionDto {
  @IsNumber()
  id: number;
}
