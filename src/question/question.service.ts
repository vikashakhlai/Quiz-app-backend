import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QuestionDto } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, quizName: string, dto: QuestionDto) {
    const quiz = await this.prisma.quiz.findFirst({
      where: {
        name: quizName,
        userId: userId,
      },
    });
    return await this.prisma.quiz_question.create({
      data: {
        video: dto?.video,
        image: dto?.video,
        question: dto.question,
        answer_options: dto.answer_options,
        answer: dto.answer,
        quizId: quiz.id,
      },
    });
  }
}
