import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    lang: string = 'en',
    excludeCountryCodes: string[] = [],
  ): Promise<CountryDto[]> {
    const countries = await this.prisma.countries.findMany();

    const filteredCountries = countries.filter(
      (country) => !excludeCountryCodes.includes(country.country_code),
    );

    return filteredCountries.map((country) => ({
      country_code: country.country_code,
      name: this.getLocalizedName(country, lang),
    }));
  }

  private getLocalizedName(country: any, lang: string): string {
    switch (lang) {
      case 'ua':
        return country.name_ua;
      case 'ru':
        return country.name_ru || country.name_en;
      case 'en':
        return country.name_en || country.name;
      case 'de':
        return country.name_de || country.name_en;
      case 'pl':
        return country.name_pl || country.name_en;
      default:
        return country.name; // По умолчанию возвращаем английское название
    }
  }
}
