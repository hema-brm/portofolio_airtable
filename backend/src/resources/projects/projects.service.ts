import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AirtableService } from 'src/database/airtable.service';

@Injectable()
export class ProjectsService {
  private readonly tableName = 'Projects';

  constructor(private readonly airtableService: AirtableService) {}

  async findAll(): Promise<Project[]> {
    return this.airtableService.get<Project>(this.tableName);
  }

  async findAllPublished(): Promise<Project[]> {
    return this.airtableService.get<Project>(this.tableName, {
      filterByFormula: 'isPublished',
    });
  }

  async findOneBySlug(slug: string): Promise<Project | null> {
    return this.airtableService.findOneByField<Project>(
      this.tableName,
      'slug',
      slug,
    );
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    return this.airtableService.create<Project>(this.tableName, dto);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    return this.airtableService.update<Project>(this.tableName, id, dto);
  }

  async publish(id: string) {
    return this.update(id, { isPublished: true });
  }

  async unpublish(id: string) {
    return this.update(id, { isPublished: false });
  }
}
