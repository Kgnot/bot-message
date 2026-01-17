import { Injectable, Inject } from '@nestjs/common';
import { AbstractConversationHandler } from '../abstract-conversation-handler';
import { Conversation } from 'src/domain/model/conversation';
import { State } from 'src/domain/model/state';
import { BotResponse } from '../../response/bot-response';
import type { ConversationRepository } from 'src/application/repository/conversation-repository';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';

/**
 * Handler for the MENU state
 * Processes user's service selection (consultation, emergency, information)
 */
@Injectable()
export class MenuHandler extends AbstractConversationHandler {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository
    ) {
        super();
    }

    protected canHandle(conversation: Conversation): boolean {
        return conversation.state === State.MENU;
    }

    protected async doHandle(conversation: Conversation, userInput: string): Promise<BotResponse> {
        const option = userInput.trim().toLowerCase();

        // Match button text or numbers
        if (option.includes('consulta') || option === '1') {
            conversation.setContextData('serviceType', 'consultation');
            conversation.transitionTo(State.TRIAGE);
            await this.conversationRepo.saveConversation(conversation);
            return {
                type: 'TEXT',
                textKey: 'TRIAGE_START'
            };
        }

        if (option.includes('emergencia') || option === '2') {
            conversation.setContextData('serviceType', 'emergency');
            conversation.transitionTo(State.TRIAGE);
            await this.conversationRepo.saveConversation(conversation);
            return {
                type: 'TEXT',
                textKey: 'EMERGENCY_TRIAGE'
            };
        }

        if (option.includes('información') || option.includes('informacion') || option === '3') {
            conversation.setContextData('serviceType', 'information');
            conversation.transitionTo(State.COMPLETED);
            await this.conversationRepo.saveConversation(conversation);
            return {
                type: 'TEXT',
                textKey: 'INFORMATION_MENU'
            };
        }

        // Invalid option, stay in MENU state
        return {
            type: 'TEXT',
            textKey: 'INVALID_OPTION'
        };
    }
}
