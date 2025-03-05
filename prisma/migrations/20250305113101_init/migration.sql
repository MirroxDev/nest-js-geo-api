-- CreateTable
CREATE TABLE "countries" (
    "country_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "name_ru" TEXT,
    "name_en" TEXT NOT NULL,
    "name_de" TEXT,
    "name_pl" TEXT,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("country_code")
);

-- CreateTable
CREATE TABLE "regions" (
    "region_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country_code" TEXT,
    "name" TEXT,
    "name_ua" TEXT,
    "name_ru" TEXT,
    "name_en" TEXT,
    "name_de" TEXT,
    "name_pl" TEXT,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("region_code")
);

-- CreateTable
CREATE TABLE "localities" (
    "osm_id" BIGSERIAL NOT NULL,
    "country_code" TEXT NOT NULL,
    "region_code" TEXT,
    "address_type" TEXT NOT NULL,
    "square" TEXT,
    "postal_code" TEXT,
    "name" TEXT,
    "name_ua" TEXT,
    "name_ru" TEXT,
    "name_en" TEXT,
    "name_de" TEXT,
    "name_pl" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "search_text" TEXT,

    CONSTRAINT "localities_pkey" PRIMARY KEY ("osm_id")
);

-- AddForeignKey
ALTER TABLE "regions" ADD CONSTRAINT "regions_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "countries"("country_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localities" ADD CONSTRAINT "localities_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "countries"("country_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localities" ADD CONSTRAINT "localities_region_code_fkey" FOREIGN KEY ("region_code") REFERENCES "regions"("region_code") ON DELETE SET NULL ON UPDATE CASCADE;
