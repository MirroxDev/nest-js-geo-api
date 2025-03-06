import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async findAll(@Query('lang') lang: string): Promise<CountryDto[]> {
    return this.countriesService.findAll(lang);
  }
}
