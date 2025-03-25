/*
  Warnings:

  - Made the column `region_code` on table `localities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country_code` on table `regions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "localities" DROP CONSTRAINT "localities_region_code_fkey";

-- DropForeignKey
ALTER TABLE "regions" DROP CONSTRAINT "regions_country_code_fkey";

-- AlterTable
ALTER TABLE "localities" ALTER COLUMN "region_code" SET NOT NULL;

-- AlterTable
ALTER TABLE "regions" ALTER COLUMN "country_code" SET NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "regions" ADD CONSTRAINT "regions_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "countries"("country_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localities" ADD CONSTRAINT "localities_region_code_fkey" FOREIGN KEY ("region_code") REFERENCES "regions"("region_code") ON DELETE RESTRICT ON UPDATE CASCADE;
