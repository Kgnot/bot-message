// Este es la intencion comunicable es decir el mensaje que se va a enviar al usuario
export type OutgoingMessage =
    | TextOutgoingMessage
    | MenuOutgoingMessage
    | AskInputOutgoingMessage
    | AskConfirmationOutgoingMessage;

export interface TextOutgoingMessage {
    kind: 'TEXT';
    textKey: string;
    text?: string;
    params?: Record<string, string>;
}

export interface MenuOutgoingMessage {
    kind: 'MENU';
    menuId: string;
    text?: string;
    options?: string[];
}

export interface AskInputOutgoingMessage {
    kind: 'ASK_INPUT';
    prompt: string;
}

export interface AskConfirmationOutgoingMessage {
    kind: 'ASK_CONFIRMATION';
    message: string;
}
