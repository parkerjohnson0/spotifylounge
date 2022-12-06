export interface ChatMessage{
    MessageID: number | undefined,
    RoomID: number | undefined,
    UserID: number | undefined,
    DisplayName: string,
    DatePosted: string,
    Message: string
}