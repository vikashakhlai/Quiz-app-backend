import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, QuizModule, QuestionModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
