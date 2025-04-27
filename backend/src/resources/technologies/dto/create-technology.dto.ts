import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(['Frontend', 'Backend', 'Base de données', 'Autre'])
  @Transform(({ value }) => value || 'Autre')
  category?: string;
}
