/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "background" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextField" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Slide_id_key" ON "Slide"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TextField_id_key" ON "TextField"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_login_key" ON "Admin"("login");
