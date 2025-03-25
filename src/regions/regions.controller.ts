import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsDto } from './dto/region.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';

@UseGuards(JwtAccessGuard)
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}
  @Get()
  async findAll(
    @Query('lang') lang: string,
    @Query('country_code') country_code: string,
  ): Promise<RegionsDto[]> {
    return this.regionsService.findAll(lang, country_code);
  }
}
