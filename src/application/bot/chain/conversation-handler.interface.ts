import { Conversation } from 'src/domain/model/conversation';
import { ResponseIntent } from '../response/response-intent';

/**
 * Base interface for conversation handlers in the Chain of Responsibility
 * Each handler represents a state or step in the conversation flow
 */
export interface ConversationHandler {
    /**
     * Set the next handler in the chain
     * @param handler The next handler to delegate to if this handler cannot process the request
     * @returns The handler that was set (for fluent API)
     */
    setNext(handler: ConversationHandler): ConversationHandler;

    /**
     * Handle the conversation based on current state and user input
     * @param conversation The current conversation state
     * @param userInput The user's input message
     * @returns A BotResponse indicating what action to take
     */
    handle(conversation: Conversation, userInput: string): Promise<ResponseIntent>;
}
