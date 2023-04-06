-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "profilePic" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "messageTime" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT,
    "status" TEXT NOT NULL,
    "userPhoneNumber" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "User_updatedAt_idx" ON "User"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "User_updatedAt_pinned_idx" ON "User"("updatedAt" DESC, "pinned");

-- CreateIndex
CREATE INDEX "User_phoneNumber_idx" ON "User" USING HASH ("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE INDEX "Message_messageTime_idx" ON "Message"("messageTime" DESC);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userPhoneNumber_fkey" FOREIGN KEY ("userPhoneNumber") REFERENCES "User"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
