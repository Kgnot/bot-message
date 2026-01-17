import { BotResponse } from "../bot/response/bot-response";
import { OutgoingMessage } from "../messaging/outgoing-message";

export function botResponseToOutgoing(response: BotResponse): OutgoingMessage {
    switch (response.type) {
        case 'TEXT':
            return {
                kind: 'TEXT',
                textKey: response.textKey,
            };

        case 'MENU':
            return {
                kind: 'MENU',
                menuId: response.menuId,
            };

        case 'ASK_INPUT':
            return {
                kind: 'ASK_INPUT',
                prompt: response.prompt,
            };

        case 'ASK_CONFIRMATION':
            return {
                kind: 'ASK_CONFIRMATION',
                message: response.message,
            };

        case 'END_CONVERSATION':
            return {
                kind: 'TEXT',
                textKey: 'GOODBYE',
            };

        default:
            return {
                kind: 'TEXT',
                textKey: 'ERROR',
            };
    }
}