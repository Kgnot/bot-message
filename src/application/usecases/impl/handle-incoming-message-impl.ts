import { HandleIncomingMessage } from "../interfaces/handle-incoming-message";
import { IncomingMessageCommand } from "./incoming-message-command";
import type { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";
import { User } from "src/domain/model";
import { Inject, Injectable } from "@nestjs/common";
import { CONVERSATION_REPOSITORY } from "src/application/repository/conversation-repository";
import { State } from "src/domain/model/state";
import { BotResponse } from "src/application/bot/response/bot-response";

@Injectable()
export class HandleIncomingMessageImpl implements HandleIncomingMessage {
    constructor(
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationsRepository: ConversationRepository

    ) { }

    async execute(command: IncomingMessageCommand): Promise<BotResponse> {
        let convo: Conversation | null = await this.conversationsRepository.getConversationByUserId(command.userId);
        console.log(command.userId);
        // arbol de desición.
        if (!convo) {
            convo = Conversation.create(User.fromId(command.userId));
        }

        switch (convo.state) {
            case State.START:
                console.log("State.START");
                convo.state = State.MENU;
                await this.conversationsRepository.saveConversation(convo);
                return { type: 'MENU', menuId: 'MAIN_MENU' } as BotResponse;

            case State.MENU:
                console.log("State.MENU");
                if (command.text === '1') {
                    return { type: 'TEXT', textKey: '   INFO' } as BotResponse;
                }
                return { type: 'END_CONVERSATION' } as BotResponse;

            default:
                // Handle any unexpected states
                return { type: 'END_CONVERSATION' } as BotResponse;
        }
    }

}