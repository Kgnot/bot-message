import { Module } from "@nestjs/common";
import { InMemoryConversationRepository } from "./repository/in-memory-conversation.repository";
import { CONVERSATION_REPOSITORY } from "src/application/repository/conversation-repository";

@Module({
    providers: [
        {
            provide: CONVERSATION_REPOSITORY,
            useClass: InMemoryConversationRepository,
        },
    ],
    exports: [CONVERSATION_REPOSITORY],
})
export class InMemoryModule { }

