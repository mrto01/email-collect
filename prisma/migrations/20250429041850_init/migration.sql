-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(6),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" BIGSERIAL NOT NULL,
    "shop" VARCHAR(255) NOT NULL,
    "install" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uninstall" TIMESTAMP(6),
    "appId" DECIMAL(20,0),
    "shopId" DECIMAL(20,0),
    "nextReset" DATE,
    "nextSync" DATE,

    CONSTRAINT "merchant_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantMeta" (
    "id" BIGSERIAL NOT NULL,
    "shop" VARCHAR(255) NOT NULL,
    "metaKey" VARCHAR(255) NOT NULL,
    "metaValue" TEXT,

    CONSTRAINT "MerchantMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Popup" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "shop" VARCHAR(255) NOT NULL,
    "subscribe" INTEGER NOT NULL DEFAULT 0,
    "createDate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Popup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shops_shop_key" ON "Merchant"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "shop_metakey" ON "MerchantMeta"("shop", "metaKey");

-- AddForeignKey
ALTER TABLE "MerchantMeta" ADD CONSTRAINT "shopmeta_shop_shop_fk" FOREIGN KEY ("shop") REFERENCES "Merchant"("shop") ON DELETE RESTRICT ON UPDATE CASCADE;
