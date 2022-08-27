import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { SubjectModule } from './Subject/subject.module';
import { ExamModule } from './Exam/Exam.module';
import { User } from './user/user.entity';
import { Exam } from './Exam/Exam.entity';
import { Diary } from './diary/diary.entity';
import { Subject } from './subject/subject.entity';
import { Exercise } from './fitness/exercise/Exercise.entity';
import { ExerciseModule } from './fitness/exercise/Exercise.module';
import { Workout } from './fitness/Workout/Workout.entity';
import { WorkoutModule } from './fitness/Workout/Workout.module';
import { Session } from './fitness/workout_session/Session.entity';
import { SessionModule } from './fitness/workout_session/Session.module';
import { Razred } from './Class/class.entity';
import { ClassModule } from './Class/class.module';
import { ClassExam } from './ClassExams/ClassExams.entity';
import { ClassExamsModule } from './ClassExams/ClassExams.module';
import {WorkTask} from "./WorkStuff/WorkTask.entity";
import {WorkTaskModule} from "./WorkStuff/WorkTask.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ConfigModule.forRoot({isGlobal: true})
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt('5432', 10),
      username: 'postgres',
      password: 'postgres',
      database: 'seminarska',
      autoLoadEntities: true,
      entities: [
        User,
        Exam,
        Diary,
        Subject,
        Exercise,
        Workout,
        Session,
        Razred,
        ClassExam,
          WorkTask
      ],
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    UserModule,
    DiaryModule,
    ExamModule,
    SubjectModule,
    ExerciseModule,
    WorkoutModule,
    SessionModule,
    ClassModule,
    ClassExamsModule,
    WorkTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
