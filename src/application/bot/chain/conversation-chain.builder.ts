import { Injectable } from '@nestjs/common';
import { ConversationHandler } from './conversation-handler.interface';
import { WelcomeHandler } from './handlers/welcome.handler';
import { MenuHandler } from './handlers/menu.handler';
import { TriageHandler } from './handlers/triage.handler';
import { CollectingNameHandler } from './handlers/collecting-name.handler';
import { CollectingReasonHandler } from './handlers/collecting-reason.handler';
import { ConfirmationHandler } from './handlers/confirmation.handler';

/**
 * Builder class for constructing the conversation handler chain
 * Encapsulates the chain assembly logic following the Builder pattern
 */
@Injectable()
export class ConversationChainBuilder {
    constructor(
        private readonly welcomeHandler: WelcomeHandler,
        private readonly menuHandler: MenuHandler,
        private readonly triageHandler: TriageHandler,
        private readonly collectingNameHandler: CollectingNameHandler,
        private readonly collectingReasonHandler: CollectingReasonHandler,
        private readonly confirmationHandler: ConfirmationHandler
    ) { }

    /**
     * Build and return the complete conversation handler chain
     * The order matters: handlers are checked in sequence
     * @returns The first handler in the chain
     */
    public build(): ConversationHandler {
        // Build the chain in order of conversation flow
        // Each handler will check if it can handle the current state
        // If not, it delegates to the next handler
        this.welcomeHandler
            .setNext(this.menuHandler)
            .setNext(this.triageHandler)
            .setNext(this.collectingNameHandler)
            .setNext(this.collectingReasonHandler)
            .setNext(this.confirmationHandler);

        // Return the first handler (entry point)
        return this.welcomeHandler;
    }
}
