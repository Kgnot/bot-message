import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { TelegramUpdate } from './types/telegram-update';
import { IncomingMessageCommand } from 'src/application/command/incoming-message-command';
import { HANDLE_INCOMING_MESSAGE, type HandleIncomingMessage } from 'src/application/usecases/interfaces/handle-incoming-message';
import { MESSAGE_SENDER, type MessageSender } from 'src/application/ports/mesage-sender';
import { User } from 'src/domain/model';
import { botResponseToOutgoing } from 'src/application/mapper/bot-response.mapper';

@Controller('telegram-webhook')
export class TelegramWebhookController {
    constructor(
        @Inject(HANDLE_INCOMING_MESSAGE)
        private readonly handleIncomingMessage: HandleIncomingMessage,
        @Inject(MESSAGE_SENDER)
        private readonly messageSender: MessageSender,
    ) { }

    @Post()
    async handle(@Body() update: TelegramUpdate) {
        const command = new IncomingMessageCommand(
            update.message.from.id.toString(),
            update.message.text,
            'telegram'
        );
        const response = await this.handleIncomingMessage.execute(command);

        if (response) {
            console.log("response", response);
            await this.messageSender.sendToUser(
                botResponseToOutgoing(response),
                User.fromId(command.userId),
            );

        }

        return { ok: true };
    }

}
