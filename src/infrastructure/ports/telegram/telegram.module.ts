import { Module } from '@nestjs/common';
import { TelegramWebhookController } from './telegram-webhook.controller';
import { HandleIncomingMessageImpl } from 'src/application/usecases/impl/handle-incoming-message-impl';
import { TelegramMessageSender } from '../telegram-message';
import { MESSAGE_SENDER } from 'src/application/ports/mesage-sender';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';
import { InMemoryConversationRepository } from 'src/infrastructure/repository/in-memory-conversation.repository';
import { HANDLE_INCOMING_MESSAGE } from 'src/application/usecases/interfaces/handle-incoming-message';
import { HttpModule } from '@nestjs/axios';
import { I18nService } from 'src/infrastructure/i18n/i18n.service';
import { SenderHandler } from './handler/sender.handler';

@Module({
  imports: [HttpModule],
  controllers: [TelegramWebhookController],
  providers: [
    {
      provide: HANDLE_INCOMING_MESSAGE,
      useClass: HandleIncomingMessageImpl,
    },
    {
      provide: MESSAGE_SENDER,
      useClass: TelegramMessageSender,
    },
    {
      provide: CONVERSATION_REPOSITORY,
      useClass: InMemoryConversationRepository,
    },
    {
      provide: I18nService,
      useClass: I18nService,
    },
    {
      provide: SenderHandler,
      useClass: SenderHandler,
    },
  ],
})
export class TelegramModule { }

