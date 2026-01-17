import { MessageSender } from "src/application/ports/mesage-sender";
import { SendMessageToUser } from "../interfaces/send-message-to-user";
import { User } from "src/domain/model";
import { OutgoingMessage } from "src/application/messaging/outgoing-message";

export class SendMessageToUserImpl implements SendMessageToUser {
    constructor(
        private readonly messageSender: MessageSender
    ) { }
    execute(message: string, user: User): Promise<void> {
        const msg: OutgoingMessage = {
            kind: 'TEXT',
            textKey: message,
        }
        return this.messageSender.sendToUser(msg, user);
    }
}