export interface CreateMessageDto {
    content: string;
    role: "user" | "chat";
}