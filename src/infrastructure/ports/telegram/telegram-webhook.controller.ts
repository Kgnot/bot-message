import { Body, Controller, Post } from '@nestjs/common';
import { TelegramUpdateMapper } from './telegram-update.mapper';
import type { TelegramUpdate } from './types/telegram-update';
import { IncomingMessageCommand } from 'src/application/command/incoming-message-command';
import { HandleIncomingMessage } from 'src/application/usecases/interfaces/handle-incoming-message';

@Controller('telegram-webhook')
export class TelegramWebhookController {
    constructor(
        private readonly handleIncomingMessage: HandleIncomingMessage
    ) { }
    @Post()
    handle(@Body() update: TelegramUpdate) {
        const command = new IncomingMessageCommand(
            update.message.from.id.toString(),
            update.message.text,
            'telegram'
        );

        return this.handleIncomingMessage.execute(command);
    }

}
