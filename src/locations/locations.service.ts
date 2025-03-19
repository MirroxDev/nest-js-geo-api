import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findLocationByQuery(query: string, lang: string, country_code: string): Promise<LocationDto[]> {
    const locations = await this.prisma.localities.findMany({
      where: {
        search_text: {
          contains: query,
          mode: 'insensitive',
        },
        country_code: country_code,
      },
      take: 20,
    });

    return locations.map((location) => ({
      osm_id: Number(location.osm_id),
      address_type: location.address_type,
      postal_code: location.postal_code || '',
      name: this.getLocalizedName(location, lang),
      lat: location.lat,
      lng: location.lng,
    }));
  }

  private getLocalizedName(item: any, lang: string): string {
    switch (lang) {
      case 'ua':
        return item.name_ua;
      case 'ru':
        return item.name_ru || item.name_en;
      case 'en':
        return item.name_en || item.name;
      case 'de':
        return item.name_de || item.name_en;
      case 'pl':
        return item.name_pl || item.name_en;
      default:
        return item.name; // По умолчанию возвращаем английское название
    }
  }
}
