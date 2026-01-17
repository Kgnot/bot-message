import { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";
import { Injectable } from "@nestjs/common";
import { State } from "src/domain/model/state";

@Injectable()
export class InMemoryConversationRepository implements ConversationRepository {
    completedConversation(conversation: Conversation): Promise<void> {
        conversation.state = State.COMPLETED;
        return Promise.resolve();
    }
    private conversations = new Map<string, Conversation>();

    async getConversationByUserId(userId: string): Promise<Conversation | null> {
        const convo = this.conversations.get(userId) ?? null;
        return convo;
    }

    async saveConversation(conversation: Conversation): Promise<void> {
        this.conversations.set(conversation.user.id, conversation);
    }
}
