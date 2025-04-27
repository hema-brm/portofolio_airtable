import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { AirtableModule } from 'src/database/airtable.module';

@Module({
  imports: [AirtableModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
