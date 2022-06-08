// Use to store all messages that comes in to the correct user.
export interface ChatMessages {
    friend: string
    messages: string[]
}


// Use to send and retrieve messages.
export interface UserMessage {
    friend: string
    message: string
}