import { Injectable } from '@nestjs/common';
import { MessageSender } from 'src/application/ports/mesage-sender';
import { User } from 'src/domain/model';
import { OutgoingMessage } from 'src/application/messaging/outgoing-message';
import { URL_TELEGRAM_ENUM } from './telegram/url/url.enum';
import { SenderHandler } from './telegram/handler/sender.handler';

@Injectable()
export class TelegramMessageSender implements MessageSender {
    constructor(
        private readonly senderHandler: SenderHandler,
    ) { }
    sendBroadcast(message: OutgoingMessage): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async sendToUser(message: OutgoingMessage, user: User): Promise<void> {
        const url = URL_TELEGRAM_ENUM.SEND_MESSAGE;

        if (message.kind === 'TEXT') {
            await this.senderHandler.sendText(url, user.id, message.textKey);
        }

        if (message.kind === 'MENU') {
            await this.senderHandler.sendMenu(url, user.id, message.menuId);
        }
    }

}
