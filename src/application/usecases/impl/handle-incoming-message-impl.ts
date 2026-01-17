import { HandleIncomingMessage } from "../interfaces/handle-incoming-message";
import { IncomingMessageCommand } from "./incoming-message-command";
import type { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";
import { User } from "src/domain/model";
import { Inject, Injectable } from "@nestjs/common";
import { CONVERSATION_REPOSITORY } from "src/application/repository/conversation-repository";
import { BotResponse } from "src/application/bot/response/bot-response";
import { ConversationChainBuilder } from "src/application/bot/chain/conversation-chain.builder";
import type { ConversationHandler } from "src/application/bot/chain/conversation-handler.interface";

/**
 * Use case implementation for handling incoming messages
 * Uses Chain of Responsibility pattern to process conversation flow
 */
@Injectable()
export class HandleIncomingMessageImpl implements HandleIncomingMessage {
    private conversationChain: ConversationHandler;

    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationsRepository: ConversationRepository,
        private readonly chainBuilder: ConversationChainBuilder
    ) {
        // Build the conversation handler chain once during initialization
        this.conversationChain = this.chainBuilder.build();
    }

    async execute(command: IncomingMessageCommand): Promise<BotResponse> {
        // Retrieve or create conversation
        let convo: Conversation | null = await this.conversationsRepository.getConversationByUserId(command.userId);

        if (!convo) {
            convo = Conversation.create(User.fromId(command.userId));
        }

        // Delegate to the chain of responsibility
        // The chain will find the appropriate handler based on conversation state
        return this.conversationChain.handle(convo, command.text);
    }
}
