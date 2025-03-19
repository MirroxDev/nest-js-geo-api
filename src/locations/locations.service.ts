import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findLocationByQuery(
    query: string,
    lang: string,
    country_code: string,
  ): Promise<LocationDto[]> {
    const locations = await this.prisma.localities.findMany({
      where: {
        search_text: {
          search: query,
        },
        country_code: country_code,
      },
      include: {
        Countries: true,
        Regions: true,
      },
      take: 20,
    });

    return locations.map((location) => ({
      osm_id: Number(location.osm_id),
      country_code: location.country_code,
      region_code: location.region_code,
      country_name: this.getLocalizedName(
        {
          name: location.Countries?.name,
          name_en: location.Countries?.name_en,
          name_ua: location.Countries?.name_ua,
          name_ru: location.Countries?.name_ru,
          name_de: location.Countries?.name_de,
          name_pl: location.Countries?.name_pl,
        },
        lang,
      ),
      region_name: this.getLocalizedName(
        {
          name: location.Regions?.name,
          name_en: location.Regions?.name_en,
          name_ua: location.Regions?.name_ua,
          name_ru: location.Regions?.name_ru,
          name_de: location.Regions?.name_de,
          name_pl: location.Regions?.name_pl,
        },
        lang,
      ),

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
        return item.name_ua || item.name;
      case 'ru':
        return item.name_ru || item.name_en || item.name;
      case 'en':
        return item.name_en || item.name;
      case 'de':
        return item.name_de || item.name_en || item.name;
      case 'pl':
        return item.name_pl || item.name_en || item.name;
      default:
        return item.name;
    }
  }
}
