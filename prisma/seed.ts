import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

async function main() {
  // Создаем страны
  await prisma.countries.create({
    data: {
      country_code: 'ua',
      name: 'Украина',
      name_ua: 'Україна',
      name_ru: 'Украина',
      name_en: 'Ukraine',
      name_de: 'Ukraine',
      name_pl: 'Ukraina',
    },
  });

  await prisma.countries.create({
    data: {
      country_code: 'pl',
      name: 'Польша',
      name_ua: 'Польща',
      name_ru: 'Польша',
      name_en: 'Poland',
      name_de: 'Polen',
      name_pl: 'Polska',
    },
  });

  // Создаем регионы
  await prisma.regions.create({
    data: {
      region_code: 'UA-32',
      country_code: 'ua',
      name: 'Киевская область',
      name_ua: 'Київська область',
      name_ru: 'Киевская область',
      name_en: 'Kyiv Oblast',
      name_de: 'Oblast Kiew',
      name_pl: 'Obwód kijowski',
    },
  });

  await prisma.regions.create({
    data: {
      region_code: 'PL-14',
      country_code: 'pl',
      name: 'Мазовецкое воеводство',
      name_ua: 'Мазовецьке воєводство',
      name_ru: 'Мазовецкое воеводство',
      name_en: 'Masovian Voivodeship',
      name_de: 'Woiwodschaft Masowien',
      name_pl: 'Mazowieckie',
    },
  });

  // Создаем населенные пункты
  await prisma.localities.create({
    data: {
      country_code: 'ua',
      region_code: 'UA-32',
      address_type: 'city',
      name: 'Киев',
      name_ua: 'Київ',
      name_ru: 'Киев',
      name_en: 'Kyiv',
      name_de: 'Kiew',
      name_pl: 'Kijów',
      lat: 50.4501,
      lng: 30.5234,
      search_text: 'Киев Kyiv Kiew Kijów',
    },
  });

  await prisma.localities.create({
    data: {
      country_code: 'pl',
      region_code: 'PL-14',
      address_type: 'city',
      name: 'Варшава',
      name_ua: 'Варшава',
      name_ru: 'Варшава',
      name_en: 'Warsaw',
      name_de: 'Warschau',
      name_pl: 'Warszawa',
      lat: 52.2297,
      lng: 21.0122,
      search_text: 'Варшава Warsaw Warschau Warszawa',
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
