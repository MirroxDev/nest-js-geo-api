import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CountriesModule } from './countries/countries.module';
import { RegionsModule } from './regions/regions.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CountriesModule,
    RegionsModule,
    LocationsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
