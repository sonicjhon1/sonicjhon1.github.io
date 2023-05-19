export type chatsData = chatData[]

export type chatData = {
    chatName: string
    chatProfile: string | undefined | null
    chatPhone: string
    chatIsPinned: boolean
    chatIsArchived: boolean
    chatMessageLatest: messageLatest | undefined | null
}

export type messageLatest = {
    messageTimestamp: 1683537000,
    messageBody: string
    messageName: string
    messageAuthor: string
    messageFromMe: boolean
    messageHasMedia: boolean
}