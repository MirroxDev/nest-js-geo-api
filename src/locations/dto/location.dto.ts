export class LocationDto {
  osm_id: number;
  country_code: string;
  region_code: string;
  address_type: string;
  postal_code: string;
  country_name: string;
  region_name: string;
  name: string;
  lat: number;
  lng: number;
}
export class PrismaResponseLocationDto {
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
