import { User } from "../../domain/model/user";
import { OutgoingMessage } from "../messaging/outgoing-message";

export const MESSAGE_SENDER = Symbol('MessageSender');

export interface MessageSender {
    sendToUser(message: OutgoingMessage, user: User): Promise<void>;
    sendBroadcast(message: OutgoingMessage): Promise<void>;
}