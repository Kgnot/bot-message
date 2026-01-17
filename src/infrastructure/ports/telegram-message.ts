import { MessageSender } from "src/domain/ports/mesage-sender";
import { Message } from "src/domain/model/message";
import { User } from "src/domain/model/user";

export class TelegramMessageSender implements MessageSender {
    sendToUser(message: Message, user: User): Promise<void> {
        console.log("Ey esto hacindo esto en TelegramMessage")
        return Promise.resolve();
    }
    sendBroadcast(message: Message): Promise<void> {
        console.log("Ey esto hacindo esto en TelegramMessage")
        return Promise.resolve();
    }
}
