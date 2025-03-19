import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiQuery({
    name: 'query',
    description: 'Название пункта',
    example: 'Киев',
    required: true
  })
  @ApiQuery({
    name: 'country_code',
    description: 'Код страны',
    example: 'ua',
    required: true
  })
  @ApiQuery({
    name: 'lang',
    description: 'Язык результата ответов',
    example: 'ua',
    required: true
  })
  async findLocationByQuery(
    @Query('query') query: string,
    @Query('lang') lang: string,
    @Query('country_code') country_code: string,
  ) {
    return this.locationsService.findLocationByQuery(query, lang, country_code);
  }
}
