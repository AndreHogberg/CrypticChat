// Use to store all messages that comes in to the correct user.
export interface ChatMessages {
    chatRoomId: string
    messages: UserMessage[]
}


// Use to send and retrieve messages.
export interface UserMessage {
    message: string
    date: string
    sender: string
}