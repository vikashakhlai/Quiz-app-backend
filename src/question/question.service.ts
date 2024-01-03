import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QuestionDto } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getUserQuestions(userId: number) {
    return await this.prisma.quiz_question.findMany({
      where: {
        Quiz: {
          userId: +userId,
        },
      },
    });
  }

  async getQuizQuestions(quizId: number) {
    return await this.prisma.quiz_question.findMany({
      where: {
        quizId: +quizId,
      },
    });
  }

  async getById(id: number) {
    return await this.prisma.quiz_question.findFirst({
      where: {
        id: +id,
      },
    });
  }

  async updateQuestion(questionId: number, dto: QuestionDto) {
    const question = this.getById(+questionId);
    if (!question) throw new UnauthorizedException('Question not found');

    return await this.prisma.quiz_question.update({
      where: {
        id: +questionId,
      },
      data: {
        image: dto?.image,
        video: dto?.video,
        question: dto.question,
        answer_options: dto.answer_options,
        answer: dto.answer,
        quizId: +dto.quizId,
      },
    });
  }

  async delete(userId: number, questionId: number) {
    const question = this.getById(+questionId);
    if (!question) throw new UnauthorizedException('Question not found');
    return await this.prisma.quiz_question.delete({
      where: {
        id: +questionId,
      },
    });
  }

  async create(userId: number) {
    return await this.prisma.quiz_question.create({
      data: {
        video: '',
        image: '',
        question: '',
        answer_options: [],
        answer: [],
        quizId: null,
      },
    });
  }
}
