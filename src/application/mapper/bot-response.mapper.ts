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