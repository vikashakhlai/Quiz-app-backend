import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService, JwtService, ConfigService],
})
export class QuestionModule {}
