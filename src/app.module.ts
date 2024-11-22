import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common-module/common-module.module';
import { TodoModule } from './todo/todo.module';
import { CommonService } from './common-module/common-module.service';
import { TodoEntity } from './todo/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';


@Module({
  imports: [
    CommonModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todo_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    CvModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
