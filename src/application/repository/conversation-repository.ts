import { Conversation } from "src/domain/model/conversation";

export const CONVERSATION_REPOSITORY = Symbol('ConversationRepository');

export interface ConversationRepository {
    getConversationByUserId(userId: string): Promise<Conversation | null>;
    saveConversation(conversation: Conversation): Promise<void>;
}