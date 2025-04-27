import { Injectable } from '@nestjs/common';
import { AirtableService } from 'src/database/airtable.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  private readonly tableName = 'Likes';

  constructor(private readonly airtableService: AirtableService) {}

  async create(dto: CreateLikeDto): Promise<Like> {
    return this.airtableService.create<Like>(this.tableName, {
      ipAddress: dto.ipAddress,
      project: [dto.projectId],
    });
  }

  async findAll(): Promise<Like[]> {
    return this.airtableService.get<Like>(this.tableName);
  }

  async countLikesByProject(projectId: string): Promise<number> {
    const likes = await this.airtableService.get<Like>(this.tableName, {
      filterByFormula: `ARRAYJOIN({project}) = "${projectId}"`,
    });
    return likes.length;
  }

  async remove(ipAddress: string, projectId: string): Promise<void> {
    const likes = await this.airtableService.get<Like>(this.tableName, {
      filterByFormula: `AND({ipAddress} = "${ipAddress}", ARRAYJOIN({project}) = "${projectId}")`,
      maxRecords: '1',
    });

    const like = likes[0];
    if (like) {
      await this.airtableService.delete(this.tableName, like.id);
    }
  }
}
