import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/decorators/user.decorator';
import { QuizDto, QuizWithIdDto } from './quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly prismaService: PrismaService,
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get()
  async getQuizzes() {
    return this.quizService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Get('user')
  async getUserQuizzes(@User('id') id: number) {
    return this.quizService.getUserQuizzes(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Delete('user')
  async deleteUserQuizzes(@User('id') id: number, @Body() dto: QuizWithIdDto) {
    return this.quizService.deleteUserQuiz(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put('user')
  async updateUserQuiz(@User('id') id: number, @Body() dto: QuizWithIdDto) {
    return this.quizService.updateUserQuiz(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.quizService.getById(id);
  }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Post()
  // async create(@Body() dto: QuizDto) {
  //   return this.quizService.create(dto);
  // }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@User('id') id: number) {
    return this.quizService.create(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/:id')
  async update(@Param('id') id: number, @Body() dto: QuizDto) {
    return this.quizService.update(id, dto);
  }

  @Patch('/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updatePassed(@Param('id') id: number) {
    return this.quizService.updatePassed(id);
  }

  @Patch('/noPassed/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updateNoPassed(@Param('id') id: number) {
    return this.quizService.updateNoPassed(id);
  }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Put()
  // async update(@Body() dto: QuizWithIdDto) {
  //   return this.quizService.update(dto);
  // }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Patch()
  // async setPassed(@Body() dto: QuizWithIdDto) {
  //   return this.quizService.setPassed(dto);
  // }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.quizService.delete(id);
  }
}
