import { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryConversationRepository implements ConversationRepository {
    private conversations = new Map<string, Conversation>();

    async getConversationByUserId(userId: string): Promise<Conversation | null> {
        const convo = this.conversations.get(userId) ?? null;
        return convo;
    }

    async saveConversation(conversation: Conversation): Promise<void> {
        this.conversations.set(conversation.user.id, conversation);
    }
}
