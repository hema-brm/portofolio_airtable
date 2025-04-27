import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AirtableService } from './airtable.service';

@Module({
  imports: [HttpModule],
  providers: [AirtableService],
  exports: [AirtableService],
})
export class AirtableModule {}
