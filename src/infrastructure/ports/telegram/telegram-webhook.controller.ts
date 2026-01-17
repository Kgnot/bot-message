import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { TelegramUpdate } from './types/telegram-update';
import { IncomingMessageCommand } from 'src/application/command/incoming-message-command';
import { HANDLE_INCOMING_MESSAGE, type HandleIncomingMessage } from 'src/application/usecases/interfaces/handle-incoming-message';

@Controller('telegram-webhook')
export class TelegramWebhookController {
    constructor(
        @Inject(HANDLE_INCOMING_MESSAGE)
        private readonly handleIncomingMessage: HandleIncomingMessage
    ) { }

    @Post()
    handle(@Body() update: TelegramUpdate) {
        const command = new IncomingMessageCommand(
            update.message.from.id.toString(),
            update.message.text,
            'telegram'
        );
        console.log("Llega al webhook", update.message.text)

        this.handleIncomingMessage.execute(command);

        return { ok: true };
    }

}
