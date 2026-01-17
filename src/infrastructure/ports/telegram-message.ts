import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MessageSender } from 'src/domain/ports/mesage-sender';
import { Message, User } from 'src/domain/model';

@Injectable()
export class TelegramMessageSender implements MessageSender {
    constructor(private readonly http: HttpService) { }

    async sendToUser(message: Message, user: User): Promise<void> {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;
        console.log("URL", url);
        await firstValueFrom(
            this.http.post(url, {
                chat_id: user.id,
                text: message.content,
            }),
        );
    }

    async sendBroadcast(message: Message): Promise<void> {
        // opcional, normalmente no se usa en Telegram
    }
}
