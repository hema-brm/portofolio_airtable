import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './resources/projects/projects.module';
import { StudentsModule } from './resources/students/students.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { TechnologiesModule } from './resources/technologies/technologies.module';
import { LikesModule } from './resources/likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProjectsModule,
    AuthModule,
    UsersModule,
    StudentsModule,
    TechnologiesModule,
    LikesModule,
  ],
})
export class AppModule {}
