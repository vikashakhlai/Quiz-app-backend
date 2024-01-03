import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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

  @Get('user')
  @Auth()
  @UsePipes(new ValidationPipe())
  async getUserQuestions(@User('id') id: number) {
    return this.questionService.getUserQuestions(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.questionService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get('/quiz/:id')
  async getQuizQuestions(@Param('id') id: number) {
    return this.questionService.getQuizQuestions(id);
  }

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(@User('id') id: number) {
    return this.questionService.create(id);
  }

  @Put('/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updateQuestion(@Param('id') id: number, @Body() dto: QuestionDto) {
    return this.questionService.updateQuestion(id, dto);
  }

  @Delete('/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async delete(@User('id') id: number, @Param('id') questionId: number) {
    return this.questionService.delete(id, questionId);
  }
}
