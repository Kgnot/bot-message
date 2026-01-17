import { Module } from '@nestjs/common';
import { StrategySelector } from '../../application/bot/strategy/strategy-selector';
import { ChainStrategy } from '../../application/bot/strategy/chain-strategy';
import { WorkflowStrategy } from '../../application/bot/strategy/workflow-strategy';
import { WorkflowEngine } from '../../application/bot/conversation/workflow-engine';
import { ConditionEvaluator } from '../../application/bot/conversation/condition-evaluator';
import { ConversationChainBuilder, WelcomeHandler, MenuHandler, TriageHandler, CollectingNameHandler, CollectingReasonHandler, ConfirmationHandler } from 'src/application/bot/chain';
import { CONDITION_EVALUATOR } from 'src/domain/model/workflow-step';
import { MongoDBPersistenceModule } from '../persistence/mongo/mongodb-persistence.module';
import { InMemoryModule } from '../persistence/memory/in-memory.module';

@Module({
    imports: [
        InMemoryModule,
        MongoDBPersistenceModule
    ],
    providers: [
        // config
        {
            provide: 'STRATEGY_CONFIG',
            useValue: {
                defaultStrategy: process.env.DEFAULT_STRATEGY || 'WORKFLOW',
            },
        },

        // strategies
        StrategySelector,
        ChainStrategy,
        WorkflowStrategy,

        // engine
        WorkflowEngine,
        {
            provide: CONDITION_EVALUATOR,
            useClass: ConditionEvaluator
        },
        // chain
        ConversationChainBuilder,
        WelcomeHandler,
        MenuHandler,
        TriageHandler,
        CollectingNameHandler,
        CollectingReasonHandler,
        ConfirmationHandler,
    ],
    exports: [
        StrategySelector,
        WorkflowEngine,
    ],
})
export class BotModule { }
