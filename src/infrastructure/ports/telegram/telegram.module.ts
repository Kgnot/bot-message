import { Module } from '@nestjs/common';
import { TelegramWebhookController } from './telegram-webhook.controller';
import { HandleIncomingMessageImpl } from 'src/application/usecases/impl/handle-incoming-message-impl';
import { TelegramMessageSender } from '../telegram-message';
import { MESSAGE_SENDER, MessageSender } from 'src/domain/ports/mesage-sender';
import { CONVERSATION_REPOSITORY } from 'src/application/repository/conversation-repository';
import { InMemoryConversationRepository } from 'src/infrastructure/repository/in-memory-conversation.repository';

@Module({
  controllers: [TelegramWebhookController],
  providers: [
    HandleIncomingMessageImpl,

    {
      provide: MESSAGE_SENDER,
      useClass: TelegramMessageSender,
    },
    {
      provide: CONVERSATION_REPOSITORY,
      useClass: InMemoryConversationRepository,
    },
  ],
})
export class TelegramModule { }

