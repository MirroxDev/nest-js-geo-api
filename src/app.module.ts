import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CountriesModule } from './countries/countries.module';
import { RegionsModule } from './regions/regions.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [PrismaModule, CountriesModule, RegionsModule, LocationsModule],
})
export class AppModule {}
