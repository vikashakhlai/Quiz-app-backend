import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: QuizDto) {
    return this.prisma.quiz.create({
      data: {
        name: dto.name,
        status: dto.status,
        userId: dto.userId,
      },
    });
  }

  async update(dto: QuizWithIdDto) {
    return this.prisma.quiz.update({
      where: {
        id: dto.id,
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

  async delete(dto: QuizWithIdDto) {
    return this.prisma.quiz.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
