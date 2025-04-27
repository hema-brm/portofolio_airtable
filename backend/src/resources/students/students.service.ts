import { Injectable, NotFoundException } from '@nestjs/common';
import { AirtableService } from 'src/database/airtable.service';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private readonly tableName = 'Students';

  constructor(private readonly airtableService: AirtableService) {}

  async findAll(): Promise<Student[]> {
    return this.airtableService.get<Student>(this.tableName);
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.airtableService.getById<Student>(
      this.tableName,
      id,
    );
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }
}
