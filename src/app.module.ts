import { Module } from '@nestjs/common';
import { TelegramModule } from './infrastructure/ports/telegram/telegram.module';
import { DatabaseModule } from './infrastructure/persistence/database.module';
import { MongoDBPersistenceModule } from './infrastructure/persistence/mongo/mongodb-persistence.module';
import { InMemoryModule } from './infrastructure/persistence/memory/in-memory.module';
@Module({
  imports: [TelegramModule, DatabaseModule, MongoDBPersistenceModule, InMemoryModule],
  controllers: [],
  providers: [
    {
      provide: 'STRATEGY_CONFIG',
      useValue: {
        defaultStrategy: process.env.DEFAULT_STRATEGY || 'WORKFLOW'
      }
    }
  ]
})
export class AppModule { }
