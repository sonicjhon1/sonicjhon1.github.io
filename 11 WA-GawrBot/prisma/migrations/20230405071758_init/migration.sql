-- CreateIndex
CREATE INDEX "Message_messageTime_idx" ON "Message"("messageTime" DESC);

-- CreateIndex
CREATE INDEX "User_updatedAt_idx" ON "User"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "User_updatedAt_pinned_idx" ON "User"("updatedAt" DESC, "pinned");

-- CreateIndex
CREATE INDEX "User_phoneNumber_idx" ON "User" USING HASH ("phoneNumber");
