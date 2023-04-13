-- CreateTable
CREATE TABLE "Chat" (
    "pkId" BIGSERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "archived" BOOLEAN,
    "contactPrimaryIdentityKey" BYTEA,
    "conversationTimestamp" BIGINT,
    "createdAt" BIGINT,
    "createdBy" TEXT,
    "description" TEXT,
    "disappearingMode" JSONB,
    "displayName" TEXT,
    "endOfHistoryTransfer" BOOLEAN,
    "endOfHistoryTransferType" INTEGER,
    "ephemeralExpiration" INTEGER,
    "ephemeralSettingTimestamp" BIGINT,
    "id" TEXT NOT NULL,
    "isDefaultSubgroup" BOOLEAN,
    "isParentGroup" BOOLEAN,
    "lastMsgTimestamp" BIGINT,
    "lidJid" TEXT,
    "markedAsUnread" BOOLEAN,
    "mediaVisibility" INTEGER,
    "messages" JSONB,
    "muteEndTime" BIGINT,
    "name" TEXT,
    "newJid" TEXT,
    "notSpam" BOOLEAN,
    "oldJid" TEXT,
    "pHash" TEXT,
    "parentGroupId" TEXT,
    "participant" JSONB,
    "pinned" INTEGER,
    "pnJid" TEXT,
    "pnhDuplicateLidThread" BOOLEAN,
    "readOnly" BOOLEAN,
    "shareOwnPn" BOOLEAN,
    "support" BOOLEAN,
    "suspended" BOOLEAN,
    "tcToken" BYTEA,
    "tcTokenSenderTimestamp" BIGINT,
    "tcTokenTimestamp" BIGINT,
    "terminated" BOOLEAN,
    "unreadCount" INTEGER,
    "unreadMentionCount" INTEGER,
    "wallpaper" JSONB,
    "lastMessageRecvTimestamp" INTEGER,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Contact" (
    "pkId" BIGSERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "notify" TEXT,
    "verifiedName" TEXT,
    "imgUrl" TEXT,
    "status" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Message" (
    "pkId" BIGSERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "remoteJid" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "agentId" TEXT,
    "bizPrivacyStatus" INTEGER,
    "broadcast" BOOLEAN,
    "clearMedia" BOOLEAN,
    "duration" INTEGER,
    "ephemeralDuration" INTEGER,
    "ephemeralOffToOn" BOOLEAN,
    "ephemeralOutOfSync" BOOLEAN,
    "ephemeralStartTimestamp" BIGINT,
    "finalLiveLocation" JSONB,
    "futureproofData" BYTEA,
    "ignore" BOOLEAN,
    "keepInChat" JSONB,
    "key" JSONB NOT NULL,
    "labels" JSONB,
    "mediaCiphertextSha256" BYTEA,
    "mediaData" JSONB,
    "message" JSONB,
    "messageC2STimestamp" BIGINT,
    "messageSecret" BYTEA,
    "messageStubParameters" JSONB,
    "messageStubType" INTEGER,
    "messageTimestamp" BIGINT,
    "multicast" BOOLEAN,
    "originalSelfAuthorUserJidString" TEXT,
    "participant" TEXT,
    "paymentInfo" JSONB,
    "photoChange" JSONB,
    "pollAdditionalMetadata" JSONB,
    "pollUpdates" JSONB,
    "pushName" TEXT,
    "quotedPaymentInfo" JSONB,
    "quotedStickerData" JSONB,
    "reactions" JSONB,
    "revokeMessageTimestamp" BIGINT,
    "starred" BOOLEAN,
    "status" INTEGER,
    "statusAlreadyViewed" BOOLEAN,
    "statusPsa" JSONB,
    "urlNumber" BOOLEAN,
    "urlText" BOOLEAN,
    "userReceipt" JSONB,
    "verifiedBizName" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("pkId")
);

-- CreateTable
CREATE TABLE "Session" (
    "pkId" BIGSERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("pkId")
);

-- CreateIndex
CREATE INDEX "Chat_sessionId_idx" ON "Chat"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_id_per_session_id_chat" ON "Chat"("sessionId", "id");

-- CreateIndex
CREATE INDEX "Contact_sessionId_idx" ON "Contact"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_id_per_session_id_contact" ON "Contact"("sessionId", "id");

-- CreateIndex
CREATE INDEX "Message_sessionId_idx" ON "Message"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_message_key_per_session_id" ON "Message"("sessionId", "remoteJid", "id");

-- CreateIndex
CREATE INDEX "Session_sessionId_idx" ON "Session"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_id_per_session_id_session" ON "Session"("sessionId", "id");
