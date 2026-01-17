import { Injectable } from '@nestjs/common';
import { MessageSender } from 'src/application/ports/mesage-sender';
import { User } from 'src/domain/model';
import { OutgoingMessage } from 'src/application/messaging/outgoing-message';
import { getTelegramUrl } from './telegram/url/url.enum';
import { SenderHandler } from './telegram/handler/sender.handler';
import { I18nService } from '../i18n/i18n.service';

@Injectable()
export class TelegramMessageSender implements MessageSender {
    constructor(
        private readonly senderHandler: SenderHandler,
        private readonly i18n: I18nService,
    ) { }

    sendBroadcast(message: OutgoingMessage): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async sendToUser(message: OutgoingMessage, user: User): Promise<void> {
        const url = getTelegramUrl(); // Get URL dynamically
        const chatId = user.id;

        switch (message.kind) {
            case 'TEXT':
                await this.senderHandler.sendText(
                    url,
                    chatId,
                    this.i18n.getText(message.textKey)
                );
                break;

            case 'MENU':
                await this.senderHandler.sendMenu(url, chatId, message.menuId);
                break;

            case 'ASK_INPUT':
                await this.senderHandler.sendAskInput(url, chatId, message.prompt);
                break;

            case 'ASK_CONFIRMATION':
                await this.senderHandler.sendAskConfirmation(url, chatId, message.message);
                break;
        }
    }

}
