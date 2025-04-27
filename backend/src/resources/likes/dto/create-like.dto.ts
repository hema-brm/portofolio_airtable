import { IsIP, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsIP()
  ipAddress: string;

  @IsString()
  projectId: string;
}
