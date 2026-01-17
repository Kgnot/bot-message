import { IncomingMessageCommand } from "../impl/incoming-message-command";

export const HANDLE_INCOMING_MESSAGE = Symbol('HANDLE_INCOMING_MESSAGE');

export interface HandleIncomingMessage {
    execute(command: IncomingMessageCommand): Promise<void>;
}