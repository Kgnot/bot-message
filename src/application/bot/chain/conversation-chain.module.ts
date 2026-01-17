import { Module } from '@nestjs/common';
import { WelcomeHandler } from './handlers/welcome.handler';
import { MenuHandler } from './handlers/menu.handler';
import { TriageHandler } from './handlers/triage.handler';
import { CollectingNameHandler } from './handlers/collecting-name.handler';
import { CollectingReasonHandler } from './handlers/collecting-reason.handler';
import { ConfirmationHandler } from './handlers/confirmation.handler';
import { ConversationChainBuilder } from './conversation-chain.builder';

/**
 * Module for conversation chain handlers
 * Registers all handlers and the chain builder as providers
 */
@Module({
    providers: [
        WelcomeHandler,
        MenuHandler,
        TriageHandler,
        CollectingNameHandler,
        CollectingReasonHandler,
        ConfirmationHandler,
        ConversationChainBuilder
    ],
    exports: [
        ConversationChainBuilder
    ]
})
export class ConversationChainModule { }
