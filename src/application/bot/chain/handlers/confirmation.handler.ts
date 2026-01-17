import { Injectable, Inject } from '@nestjs/common';
import { AbstractConversationHandler } from '../abstract-conversation-handler';
import { Conversation } from 'src/domain/model/conversation';
import { State } from 'src/domain/model/state';
import { ResponseIntent } from '../../response/response-intent';
import type { ConversationRepository } from 'src/application/repository/conversation-repository';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';

/**
 * Handler for the CONFIRMATION state
 * Processes user's confirmation and completes or restarts the flow
 */
@Injectable()
export class ConfirmationHandler extends AbstractConversationHandler {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository
    ) {
        super();
    }

    protected canHandle(conversation: Conversation): boolean {
        return conversation.state === State.CONFIRMATION;
    }

    protected async doHandle(conversation: Conversation, userInput: string): Promise<ResponseIntent> {
        const input = userInput.toLowerCase().trim();
        const confirmed = this.isConfirmation(input);

        if (confirmed) {
            // User confirmed the data
            conversation.transitionTo(State.COMPLETED);
            await this.conversationRepo.saveConversation(conversation);

            const name = conversation.getContextData('patientName');
            const serviceType = conversation.getContextData('serviceType');

            return {
                type: 'TEXT',
                textKey: 'APPOINTMENT_CONFIRMED',
                // In a real scenario, this would trigger appointment creation
                // For now, we just confirm receipt
            };
        } else if (this.isRejection(input)) {
            // User wants to restart
            conversation.transitionTo(State.MENU);
            // Clear previous data
            conversation.setContextData('patientName', undefined);
            conversation.setContextData('visitReason', undefined);
            conversation.setContextData('serviceType', undefined);
            await this.conversationRepo.saveConversation(conversation);

            return {
                type: 'MENU',
                menuId: 'MAIN_MENU'
            };
        } else {
            // Invalid response, ask again
            return {
                type: 'TEXT',
                textKey: 'INVALID_CONFIRMATION'
            };
        }
    }

    private isConfirmation(input: string): boolean {
        const confirmations = ['si', 'sí', 'yes', 'y', '1', 'ok', 'confirmar', 'confirmo'];
        return confirmations.includes(input);
    }

    private isRejection(input: string): boolean {
        const rejections = ['no', 'n', '0', 'cancelar', 'reiniciar'];
        return rejections.includes(input);
    }
}
