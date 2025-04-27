import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { AirtableModule } from 'src/database/airtable.module';

@Module({
  imports: [AirtableModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
