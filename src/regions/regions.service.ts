import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegionsDto } from './dto/region.dto';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    lang: string = 'en',
    country_code: string,
  ): Promise<RegionsDto[]> {
    const regions = await this.prisma.regions.findMany({
      where: {
        country_code: country_code,
      },
    });
    return regions.map((region) => ({
      region_code: region.region_code,
      name: this.getLocalizedName(region, lang),
    }));
  }

  private getLocalizedName(region: any, lang: string): string {
    switch (lang) {
      case 'ua':
        return region.name_ua;
      case 'ru':
        return region.name_ru || region.name_en;
      case 'en':
        return region.name_en || region.name;
      case 'de':
        return region.name_de || region.name_en;
      case 'pl':
        return region.name_pl || region.name_en;
      default:
        return region.name; // По умолчанию возвращаем английское название
    }
  }
}
