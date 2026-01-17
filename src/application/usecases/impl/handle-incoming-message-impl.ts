import { MessageSender } from "src/domain/ports/mesage-sender";
import { HandleIncomingMessage } from "../interfaces/handle-incoming-message";
import { IncomingMessageCommand } from "./incoming-message-command";
import { ConversationRepository } from "src/application/repository/conversation-repository";
import { Conversation } from "src/domain/model/conversation";
import { User } from "src/domain/model";
import { Message } from "src/domain/model/message";

export class HandleIncomingMessageImpl implements HandleIncomingMessage {
    constructor(
        private readonly sender: MessageSender,
        private readonly conversationsRepository: ConversationRepository

    ) { }

    async execute(command: IncomingMessageCommand): Promise<void> {
        let convo: Conversation | null = await this.conversationsRepository.getConversationByUserId(command.userId);
        console.log(command.userId);
        // AQUI IRIA EL ARBOL DE DESICIÓN TODO
        if (!convo) {
            convo = Conversation.create(User.fromId(command.userId));
        }

        convo.addMessage(Message.fromUser(command.userId, command.text));
    }
}