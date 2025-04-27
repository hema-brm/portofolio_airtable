import { Injectable, NotFoundException } from '@nestjs/common';
import { AirtableService } from 'src/database/airtable.service';
import { Technology } from './entities/technology.entity';

@Injectable()
export class TechnologiesService {
  private readonly tableName = 'Technologies';

  constructor(private readonly airtableService: AirtableService) {}

  async findAll(): Promise<Technology[]> {
    return this.airtableService.get<Technology>(this.tableName);
  }

  async findOne(id: string): Promise<Technology> {
    const technology = await this.airtableService.getById<Technology>(
      this.tableName,
      id,
    );
    if (!technology) {
      throw new NotFoundException(`Technology with id ${id} not found`);
    }
    return technology;
  }
}
