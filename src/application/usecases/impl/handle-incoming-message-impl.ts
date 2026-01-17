import type { MessageSender } from "src/domain/ports/mesage-sender";
import { HandleIncomingMessage } from "../interfaces/handle-incoming-message";
import { IncomingMessageCommand } from "./incoming-message-command";
import type { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";
import { User } from "src/domain/model";
import { Message } from "src/domain/model/message";
import { Inject, Injectable } from "@nestjs/common";
import { MESSAGE_SENDER } from "src/domain/ports/mesage-sender";
import { CONVERSATION_REPOSITORY } from "src/application/repository/conversation-repository";
import { State } from "src/domain/model/state";

@Injectable()
export class HandleIncomingMessageImpl implements HandleIncomingMessage {
    constructor(
        @Inject(MESSAGE_SENDER)
        private readonly sender: MessageSender,
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationsRepository: ConversationRepository

    ) { }

    async execute(command: IncomingMessageCommand): Promise<void> {
        let convo: Conversation | null = await this.conversationsRepository.getConversationByUserId(command.userId);
        console.log(command.userId);
        // AQUI IRIA EL ARBOL DE DESICIÓN TODO
        if (!convo) {
            convo = Conversation.create(User.fromId(command.userId));
        }

        switch (convo.state) {
            case State.START:
                await this.sender.sendToUser(
                    Message.create('Hola, elige una opción:\n1. Info\n2. Soporte'),
                    convo.user
                );
                convo.state = State.MENU;
                await this.conversationsRepository.saveConversation(convo);
                break;

            case State.MENU:
                console.log("Entre a MENU: ", command.text)
                if (command.text === '1') {
                    await this.sender.sendToUser(
                        Message.create('Información...'),
                        convo.user
                    );
                }
                break;
        }


        convo.addMessage(Message.fromUser(command.userId, command.text));
    }
}