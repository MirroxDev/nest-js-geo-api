import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';
import { ApiQuery } from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';

@UseGuards(JwtAccessGuard)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiQuery({
    name: 'lang',
    description: 'Язык, на котором нужно вернуть названия стран',
    example: 'en',
    enum: ['en', 'ua'], // Указываем допустимые значения
    required: false, // Указываем, что параметр не обязательный
  })
  @ApiQuery({
    name: 'excludeCountryCodes',
    description: 'Коды стран, которые нужно исключить из ответа',
    example: ['ru'],
    required: false,
    type: [String], // Указываем тип массива строк
  })
  async findAll(
    @Query('lang') lang: string,
    @Query('excludeCountryCodes') excludeCountryCodes: string[],
  ): Promise<CountryDto[]> {
    return this.countriesService.findAll(lang, excludeCountryCodes);
  }
}
