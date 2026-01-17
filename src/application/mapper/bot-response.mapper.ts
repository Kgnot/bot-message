import { ResponseIntent } from "../bot/response/response-intent";
import { OutgoingMessage } from "../messaging/outgoing-message";

export function botResponseToOutgoing(response: ResponseIntent): OutgoingMessage {
    switch (response.type) {
        case 'TEXT':
            console.log("response", response);
            return {
                kind: 'TEXT',
                textKey: response.textKey || 'DYNAMIC_TEXT',
                text: response.text,
            };

        case 'MENU':
            console.log("response", response);
            return {
                kind: 'MENU',
                menuId: response.menuId,
                text: response.text,
                options: response.options,
            };

        case 'ASK_INPUT':
            console.log("response", response);
            return {
                kind: 'ASK_INPUT',
                prompt: response.prompt,
            };

        case 'ASK_CONFIRMATION':
            console.log("response", response);
            return {
                kind: 'ASK_CONFIRMATION',
                message: response.message,
            };

        case 'END_CONVERSATION':
            console.log("response", response);
            return {
                kind: 'TEXT',
                textKey: 'GOODBYE',
            };

        default:
            console.log("response", response);
            return {
                kind: 'TEXT',
                textKey: 'ERROR',
            };
    }
}