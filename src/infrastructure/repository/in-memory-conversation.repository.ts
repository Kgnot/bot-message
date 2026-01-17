import { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";

export class InMemoryConversationRepository implements ConversationRepository {
    private conversations: Conversation[] = [];
    getConversationByUserId(userId: string): Promise<Conversation | null> {
        const conversation = this.conversations.find((conversation) => conversation.user.id === userId);
        return Promise.resolve(conversation ?? null);
    }
    saveConversation(conversation: Conversation): Promise<void> {
        this.conversations.push(conversation);
        return Promise.resolve();
    }

}