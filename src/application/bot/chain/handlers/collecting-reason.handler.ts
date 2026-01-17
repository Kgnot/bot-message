import { Injectable, Inject } from '@nestjs/common';
import { AbstractConversationHandler } from '../abstract-conversation-handler';
import { Conversation } from 'src/domain/model/conversation';
import { State } from 'src/domain/model/state';
import { ResponseIntent } from '../../response/response-intent';
import type { ConversationRepository } from 'src/application/repository/conversation-repository';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';

/**
 * Handler for the COLLECTING_REASON state
 * Stores visit reason and asks for confirmation
 */
@Injectable()
export class CollectingReasonHandler extends AbstractConversationHandler {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository
    ) {
        super();
    }

    protected canHandle(conversation: Conversation): boolean {
        return conversation.state === State.COLLECTING_REASON;
    }

    protected async doHandle(conversation: Conversation, userInput: string): Promise<ResponseIntent> {
        const visitReason = userInput.trim();

        // Validate reason
        if (visitReason.length < 5) {
            return {
                type: 'TEXT',
                textKey: 'INVALID_REASON'
            };
        }

        // Store reason in context
        conversation.setContextData('visitReason', visitReason);
        conversation.transitionTo(State.CONFIRMATION);
        await this.conversationRepo.saveConversation(conversation);

        // Build confirmation message with collected data
        const name = conversation.getContextData('patientName');
        const reason = conversation.getContextData('visitReason');
        const serviceType = conversation.getContextData('serviceType');

        const serviceTypeText = this.getServiceTypeText(serviceType);

        return {
            type: 'ASK_CONFIRMATION',
            confirmationKey: 'CONFIRM_DATA',
            message: `Por favor confirme sus datos:\n\n📋 Nombre: ${name}\n🏥 Tipo de servicio: ${serviceTypeText}\n📝 Motivo: ${reason}\n\n¿Los datos son correctos? (Responda Sí/No)`
        };
    }

    private getServiceTypeText(serviceType: string): string {
        const types: Record<string, string> = {
            'consultation': 'Consulta médica',
            'emergency': 'Emergencia',
            'information': 'Información general'
        };
        return types[serviceType] || serviceType;
    }
}
