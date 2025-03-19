import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationDto } from './dto/location.dto';
import { Prisma } from '@prisma/client';

interface RawLocation {
  osm_id: bigint;
  country_code: string;
  region_code: string;
  address_type: string;
  postal_code: string | null;
  name: string;
  name_en: string;
  name_ua: string;
  name_ru: string;
  name_de: string;
  name_pl: string;
  lat: number;
  lng: number;
  country_name_default: string;
  region_name_default: string;
  country_name_en: string;
  country_name_ua: string;
  country_name_ru: string;
  country_name_de: string;
  country_name_pl: string;
  region_name_en: string;
  region_name_ua: string;
  region_name_ru: string;
  region_name_de: string;
  region_name_pl: string;
}

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findLocationByQuery(
    query: string,
    lang: string,
    country_code: string,
  ): Promise<LocationDto[]> {
    // const locations = await this.prisma.localities.findMany({
    //   where: {
    //     search_text: {
    //       contains: query,
    //       mode: 'insensitive',
    //     },
    //     country_code: country_code,
    //   },
    //   include: {
    //     Countries: true,
    //     Regions: true
    //   },
    //   take: 20,
    // });
    const locations = await this.prisma.$queryRaw<RawLocation[]>(Prisma.sql`
      SELECT l.*, 
             c.name_en as country_name_en, c.name as country_name_default, c.name_en as country_name_en, c.name_ua as country_name_ua, c.name_ru as country_name_ru, c.name_de as country_name_de, c.name_pl as country_name_pl,
             r.name_en as region_name_en, r.name as region_name_default, r.name_ua as region_name_ua, r.name_ru as region_name_ru, r.name_de as region_name_de, r.name_pl as region_name_pl
      FROM localities l
      LEFT JOIN countries c ON l.country_code = c.country_code
      LEFT JOIN regions r ON l.region_code = r.region_code
      WHERE to_tsvector('simple', l.search_text) @@ plainto_tsquery('simple', ${query})
      AND l.country_code = ${country_code}
      ORDER BY ts_rank(to_tsvector('simple', l.search_text), plainto_tsquery('simple', ${query})) DESC
      LIMIT 20
    `);

    return locations.map((location) => ({
      osm_id: Number(location.osm_id),
      country_code: location.country_code,
      region_code: location.region_code,
      country_name: this.getLocalizedName(
        {
          name_en: location.country_name_en,
          name_ua: location.country_name_ua,
          name_ru: location.country_name_ru,
          name_de: location.country_name_de,
          name_pl: location.country_name_pl,
        },
        lang,
      ),
      region_name: this.getLocalizedName(
        {
          name_en: location.region_name_en,
          name_ua: location.region_name_ua,
          name_ru: location.region_name_ru,
          name_de: location.region_name_de,
          name_pl: location.region_name_pl,
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
        return item.name;
    }
  }
}
