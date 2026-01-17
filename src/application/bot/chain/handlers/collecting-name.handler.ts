import { Injectable, Inject } from '@nestjs/common';
import { AbstractConversationHandler } from '../abstract-conversation-handler';
import { Conversation } from 'src/domain/model/conversation';
import { State } from 'src/domain/model/state';
import { ResponseIntent } from '../../response/response-intent';
import type { ConversationRepository } from 'src/application/repository/conversation-repository';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';

/**
 * Handler for the COLLECTING_NAME state
 * Stores patient name and asks for visit reason
 */
@Injectable()
export class CollectingNameHandler extends AbstractConversationHandler {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository
    ) {
        super();
    }

    protected canHandle(conversation: Conversation): boolean {
        return conversation.state === State.COLLECTING_NAME;
    }

    protected async doHandle(conversation: Conversation, userInput: string): Promise<ResponseIntent> {
        const patientName = userInput.trim();

        // Validate name (basic validation)
        if (patientName.length < 2) {
            return {
                type: 'TEXT',
                textKey: 'INVALID_NAME'
            };
        }

        // Store name in context
        conversation.setContextData('patientName', patientName);
        conversation.transitionTo(State.COLLECTING_REASON);
        await this.conversationRepo.saveConversation(conversation);

        return {
            type: 'ASK_INPUT',
            inputKey: 'VISIT_REASON',
            prompt: '¿Cuál es el motivo de su consulta?'
        };
    }
}
