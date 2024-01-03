import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QuizDto, QuizWithIdDto } from './quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.quiz.findMany({
      include: { quiz_questions: true },
    });
  }

  async getUserQuizzes(id: number) {
    return this.prisma.quiz.findMany({
      where: {
        userId: id,
      },
      include: { quiz_questions: true },
    });
  }

  async getOneUserQuiz(dto: QuizWithIdDto) {
    return this.prisma.quiz.findFirst({
      where: {
        userId: dto.userId,
        id: dto.id,
      },
      include: { quiz_questions: true },
    });
  }

  async updateUserQuiz(userId: number, dto: QuizWithIdDto) {
    return this.prisma.quiz.update({
      where: {
        userId: userId,
        id: dto.id,
      },
      data: {
        name: dto.name,
        status: dto?.status,
      },
    });
  }

  async deleteUserQuiz(userId: number, dto: QuizWithIdDto) {
    return this.prisma.quiz.delete({
      where: {
        userId: userId,
        id: dto.id,
      },
    });
  }

  async updatePassed(id: number) {
    const quiz = this.getById(+id);
    if (!quiz) throw new UnauthorizedException('Quiz not found');
    return await this.prisma.quiz.update({
      where: {
        id: +id,
      },
      data: {
        isPassed: true,
      },
    });
  }

  async updateNoPassed(id: number) {
    return await this.prisma.quiz.update({
      where: {
        id: +id,
      },
      data: {
        isPassed: false,
      },
    });
  }

  async getById(id: number) {
    return this.prisma.quiz.findFirst({
      where: {
        id: +id,
      },
      include: {
        quiz_questions: true,
      },
    });
  }

  async getOne(dto: QuizWithIdDto) {
    const quiz = await this.prisma.quiz.findFirst({
      where: {
        id: dto.id,
      },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async create(userId: number) {
    return this.prisma.quiz.create({
      data: {
        name: '',
        status: 'one_day',
        userId: userId,
      },
    });
  }

  async update(id: number, dto: QuizDto) {
    return this.prisma.quiz.update({
      where: {
        id: +id,
      },
      data: {
        name: dto.name,
        status: dto.status,
      },
    });
  }

  async setPassed(dto: QuizWithIdDto) {
    return this.prisma.quiz.update({
      where: {
        id: dto.id,
      },
      data: {
        isPassed: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.quiz.delete({
      where: {
        id: +id,
      },
    });
  }
}
