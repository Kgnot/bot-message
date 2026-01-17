import { Injectable, Inject } from '@nestjs/common';
import { AbstractConversationHandler } from '../abstract-conversation-handler';
import { Conversation } from 'src/domain/model/conversation';
import { State } from 'src/domain/model/state';
import { ResponseIntent } from '../../response/response-intent';
import type { ConversationRepository } from 'src/application/repository/conversation-repository';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';

/**
 * Handler for the START state
 * Welcomes the user and transitions to the main menu
 */
@Injectable()
export class WelcomeHandler extends AbstractConversationHandler {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository
    ) {
        super();
    }

    protected canHandle(conversation: Conversation): boolean {
        return conversation.state === State.START;
    }

    protected async doHandle(conversation: Conversation, userInput: string): Promise<ResponseIntent> {
        // Transition to menu state
        conversation.transitionTo(State.MENU);
        await this.conversationRepo.saveConversation(conversation);

        return {
            type: 'MENU',
            menuId: 'MAIN_MENU'
        };
    }
}
