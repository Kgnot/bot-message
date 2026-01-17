import { Inject, Injectable } from "@nestjs/common";
import { CONDITION_EVALUATOR, type ConditionEvaluator } from "src/domain/model/workflow-step";
import { CONVERSATION_REPOSITORY, type ConversationRepository } from "src/application/repository/conversation-repository";
import { Workflow } from "src/domain/model/workflow";
import { Conversation } from "src/domain/model/conversation";
import { ResponseIntent } from "../response/response-intent";

@Injectable()
export class WorkflowEngine {
    constructor(
        @Inject(CONDITION_EVALUATOR)
        private readonly conditionEvaluator: ConditionEvaluator,
        @Inject(CONVERSATION_REPOSITORY)
        private readonly conversationRepo: ConversationRepository
    ) { }

    async execute(
        workflow: Workflow,
        currentStepId: string | null,
        conversation: Conversation,
        userInput: string
    ): Promise<WorkflowExecutionResult> {
        const stepId = currentStepId || workflow.firstStepId;
        const step = workflow.getStep(stepId);

        if (!step) {
            throw new Error(`Step ${stepId} not found in workflow ${workflow.id}`);
        }

        const response: ResponseIntent = step.response;
        const nextStepId = step.findNextStep(userInput, this.conditionEvaluator);

        await this.conversationRepo.saveConversation(conversation);

        return {
            response,
            nextStepId
        } as WorkflowExecutionResult;
    }
}
export interface WorkflowExecutionResult {
    response: ResponseIntent;
    nextStepId: string | null;
}