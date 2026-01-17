import { IncomingMessageCommand } from "../impl/incoming-message-command";

export const HANDLE_INCOMING_MESSAGE = Symbol('HandleIncomingMessage');

export interface HandleIncomingMessage {
    execute(command: IncomingMessageCommand): Promise<void>;
}