import { Injectable } from '@nestjs/common';
import { ConversationStrategy } from './conversation-strategy.interface';
import { Conversation } from 'src/domain/model/conversation';
import { ResponseIntent } from '../response/response-intent';
import { ConversationChainBuilder } from '../chain/conversation-chain.builder';

/**
 * Chain of Responsibility strategy
 * Uses the existing chain handlers for conversation processing
 */
@Injectable()
export class ChainStrategy implements ConversationStrategy {
    constructor(
        private readonly chainBuilder: ConversationChainBuilder
    ) { }

    async execute(
        conversation: Conversation,
        userInput: string
    ): Promise<ResponseIntent> {
        const chain = this.chainBuilder.build();
        return chain.handle(conversation, userInput);
    }

    getName(): string {
        return 'CHAIN';
    }
}
