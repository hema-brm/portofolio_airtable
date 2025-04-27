import { Controller, Post, Get, Delete, Body, Query } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get('stats')
  async getLikesStats(@Query('projectId') projectId: string) {
    return {
      projectId,
      likes: await this.likesService.countLikesByProject(projectId),
    };
  }

  @Delete()
  async deleteLike(
    @Query('ipAddress') ipAddress: string,
    @Query('projectId') projectId: string,
  ) {
    await this.likesService.remove(ipAddress, projectId);
    return { message: 'Like deleted if it existed.' };
  }
}
