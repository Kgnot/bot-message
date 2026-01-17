import { Injectable, Inject } from '@nestjs/common';
import { AbstractConversationHandler } from '../abstract-conversation-handler';
import { Conversation } from 'src/domain/model/conversation';
import { State } from 'src/domain/model/state';
import { BotResponse } from '../../response/bot-response';
import type { ConversationRepository } from 'src/application/repository/conversation-repository';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';

/**
 * Handler for the TRIAGE state
 * Initiates patient data collection by asking for name
 */
@Injectable()
export class TriageHandler extends AbstractConversationHandler {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository
    ) {
        super();
    }

    protected canHandle(conversation: Conversation): boolean {
        return conversation.state === State.TRIAGE;
    }

    protected async doHandle(conversation: Conversation, userInput: string): Promise<BotResponse> {
        // Start collecting patient name
        conversation.transitionTo(State.COLLECTING_NAME);
        await this.conversationRepo.saveConversation(conversation);

        return {
            type: 'ASK_INPUT',
            inputKey: 'PATIENT_NAME',
            prompt: '¿Cuál es su nombre completo?'
        };
    }
}
