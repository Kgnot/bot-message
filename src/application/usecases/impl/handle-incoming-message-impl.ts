import { HandleIncomingMessage } from "../interfaces/handle-incoming-message";
import { IncomingMessageCommand } from "./incoming-message-command";
import type { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";
import { User } from "src/domain/model";
import { Inject, Injectable } from "@nestjs/common";
import { CONVERSATION_REPOSITORY } from "src/application/repository/conversation-repository";
import { ResponseIntent } from "src/application/bot/response/response-intent";
import { StrategySelector } from "src/application/bot/strategy/strategy-selector";
import { ConversationStrategy } from "src/application/bot/strategy/conversation-strategy.interface";

@Injectable()
export class HandleIncomingMessageImpl implements HandleIncomingMessage {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository,
        private readonly strategySelector: StrategySelector
    ) { }
    async execute(command: IncomingMessageCommand): Promise<ResponseIntent> {
        let conversation = await this.conversationRepo.getConversationByUserId(command.userId);
        if (!conversation) {
            conversation = Conversation.create(User.fromId(command.userId));
        }

        const strategy: ConversationStrategy = this.strategySelector.select(conversation);
        console.log(`Using strategy: ${strategy.getName()}`);

        const response: ResponseIntent = await strategy.execute(conversation, command.text);

        await this.conversationRepo.saveConversation(conversation);

        return response;
    }
}
