-- CreateTable
CREATE TABLE "Tenants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "primaryEmail" TEXT NOT NULL,
    "invitationCode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_name_key" ON "Tenants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_slug_key" ON "Tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_primaryEmail_key" ON "Tenants"("primaryEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_invitationCode_key" ON "Tenants"("invitationCode");
