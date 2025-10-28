/*
  Warnings:

  - Added the required column `name` to the `Draft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Draft" ADD COLUMN     "name" TEXT NOT NULL;
