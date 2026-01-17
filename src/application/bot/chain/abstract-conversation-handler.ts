import { ConversationHandler } from './conversation-handler.interface';
import { Conversation } from 'src/domain/model/conversation';
import { ResponseIntent } from '../response/response-intent';

/**
 * Abstract base class implementing the Chain of Responsibility pattern
 * Provides common chain logic while allowing subclasses to define specific handling behavior
 */
export abstract class AbstractConversationHandler implements ConversationHandler {
    private nextHandler: ConversationHandler | null = null;

    /**
     * Set the next handler in the chain
     * Implements fluent interface for easy chain building
     */
    public setNext(handler: ConversationHandler): ConversationHandler {
        this.nextHandler = handler;
        return handler;
    }

    /**
     * Main handler method implementing the chain logic
     * Checks if this handler can process the request, otherwise delegates to next handler
     */
    public async handle(conversation: Conversation, userInput: string): Promise<ResponseIntent> {
        if (this.canHandle(conversation)) {
            return this.doHandle(conversation, userInput);
        }

        if (this.nextHandler) {
            return this.nextHandler.handle(conversation, userInput);
        }

        // Fallback response if no handler in the chain can process the request
        return { type: 'END_CONVERSATION' } as ResponseIntent;
    }

    /**
     * Determine if this handler can process the current conversation state
     * @param conversation The current conversation
     * @returns true if this handler should process the request
     */
    protected abstract canHandle(conversation: Conversation): boolean;

    /**
     * Process the conversation and return appropriate response
     * Only called if canHandle returns true
     * @param conversation The current conversation
     * @param userInput The user's input message
     * @returns A BotResponse indicating what action to take
     */
    protected abstract doHandle(conversation: Conversation, userInput: string): Promise<ResponseIntent>;
}
