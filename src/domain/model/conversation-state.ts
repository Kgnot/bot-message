import { Conversation } from "./conversation";
import { v4 as uuidv4 } from 'uuid';

export class ConversationState {
    id: string;
    conversation: Conversation;
    state: string;

    constructor(id: string, conversation: Conversation, state: string) {
        this.id = id;
        this.conversation = conversation;
        this.state = state;
    }

    static create(conversation: Conversation, state: string): ConversationState {
        return new ConversationState(
            uuidv4(),
            conversation,
            state
        );
    }
}