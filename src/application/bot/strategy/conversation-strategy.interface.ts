import { Conversation } from 'src/domain/model/conversation';
import { ResponseIntent } from '../response/response-intent';

/**
 * Strategy interface for conversation handling
 * Allows switching between different conversation processing strategies
 */
export interface ConversationStrategy {
    /**
     * Execute the strategy to process user input
     * @param conversation Current conversation
     * @param userInput User's input message
     * @returns Response intent to send to user
     */
    execute(
        conversation: Conversation,
        userInput: string
    ): Promise<ResponseIntent>;

    /**
     * Get the name of this strategy for logging/debugging
     */
    getName(): string;
}
