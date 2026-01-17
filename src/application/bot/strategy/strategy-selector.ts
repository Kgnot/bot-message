import { Inject, Injectable } from "@nestjs/common";
import { ChainStrategy } from "./chain-strategy";
import { WorkflowStrategy } from "./workflow-strategy";
import { ConversationStrategy } from "./conversation-strategy.interface";
import { Conversation } from "src/domain/model/conversation";

export type StrategyType = 'CHAIN' | 'WORKFLOW';

@Injectable()
export class StrategySelector {
    constructor(
        private readonly chainStrategy: ChainStrategy,
        private readonly workflowStrategy: WorkflowStrategy,
        @Inject('STRATEGY_CONFIG') private readonly config: StrategyConfig
    ) { }

    select(conversation: Conversation): ConversationStrategy {
        const preferredStrategy = conversation.getContextData('strategy') as StrategyType;
        if (preferredStrategy) {
            return this.getStrategy(preferredStrategy);
        }

        return this.getStrategy(this.config.defaultStrategy);
    }

    private getStrategy(type: StrategyType): ConversationStrategy {
        switch (type) {
            case 'CHAIN':
                return this.chainStrategy;
            case 'WORKFLOW':
                return this.workflowStrategy;
            default:
                return this.workflowStrategy;
        }
    }
}
export interface StrategyConfig {
    defaultStrategy: StrategyType;
}