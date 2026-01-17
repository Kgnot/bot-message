// Este es la intencion comunicable es decir el mensaje que se va a enviar al usuario
export type OutgoingMessage =
    | TextOutgoingMessage
    | MenuOutgoingMessage;

export interface TextOutgoingMessage {
    kind: 'TEXT';
    textKey: string;
    params?: Record<string, string>;
}

export interface MenuOutgoingMessage {
    kind: 'MENU';
    menuId: string;
}
