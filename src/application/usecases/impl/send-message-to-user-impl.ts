import { MessageSender } from "src/domain/ports/mesage-sender";
import { SendMessageToUser } from "../interfaces/send-message-to-user";
import { User, Message } from "src/domain/model";

export class SendMessageToUserImpl implements SendMessageToUser {
    constructor(
        private readonly messageSender: MessageSender
    ) { }
    execute(message: string, user: User): Promise<void> {
        const msg: Message = Message.create(message);
        return this.messageSender.sendToUser(msg, user);
    }
}