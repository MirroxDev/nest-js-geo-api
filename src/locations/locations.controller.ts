import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async findLocationByQuery(
    @Query('query') query: string,
    @Query('lang') lang: string,
    @Query('country_code') country_code: string,
  ) {
    return this.locationsService.findLocationByQuery(query, lang, country_code);
  }
}
