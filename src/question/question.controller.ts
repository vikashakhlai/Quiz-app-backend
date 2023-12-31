import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from 'src/user/decorators/user.decorator';
import { QuestionDto } from './question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(
    @User('id') id: number,
    quizName: string,
    @Body() dto: QuestionDto,
  ) {
    return this.questionService.create(id, quizName, dto);
  }

  // @Delete()
  // @Auth()
  // @UsePipes(new ValidationPipe())
  // async delete(
  //   @User('id') id: number,
  //   quizName: string,
  //   @Body() dto: QuestionDto,
  // ) {
  //   return this.questionService.delete(id, quizName, dto);
  // }
}
