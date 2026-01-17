import { Message } from "../model/message";
import { User } from "../model/user";

export const MESSAGE_SENDER = Symbol('MessageSender');

export interface MessageSender {
    sendToUser(message: Message, user: User): Promise<void>;
    sendBroadcast(message: Message): Promise<void>;
}