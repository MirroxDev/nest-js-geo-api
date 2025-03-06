import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(lang: string = 'en'): Promise<CountryDto[]> {
    const countries = await this.prisma.countries.findMany();

    return countries.map((country) => ({
      country_code: country.country_code,
      name: country.name, // Название по умолчанию (например, на английском)
      localized_name: this.getLocalizedName(country, lang), // Локализованное название
      created_at: country.created_at,
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
