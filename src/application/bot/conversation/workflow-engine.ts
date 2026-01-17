import { Inject, Injectable } from "@nestjs/common";
import { CONDITION_EVALUATOR, type ConditionEvaluator } from "src/domain/model/workflow-step";
import { CONVERSATION_REPOSITORY, type ConversationRepository } from "src/application/repository/conversation-repository";
import { Workflow } from "src/domain/model/workflow";
import { Conversation } from "src/domain/model/conversation";
import { ResponseIntent } from "../response/response-intent";
import { State } from "src/domain/model/state";

/**
 * Ejecutar un workflow paso a paso dado un input del usuario y devolver qué responder y a qué paso ir después
 */
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
        if (conversation.state === State.COMPLETED) {
            currentStepId = null;
        }
        const stepId = currentStepId || workflow.firstStepId;
        // Aqui nosotros obtenemos el paso inicial
        const step = workflow.getStep(stepId);

        if (!step) {
            throw new Error(`Step ${stepId} not found in workflow ${workflow.id}`);
        }

        const response: ResponseIntent = step.response;
        const nextStepId = step.findNextStep(userInput, this.conditionEvaluator);
        // validamos si el paso es el último, de serlo reiniciamos la conversación
        if (!nextStepId) {
            await this.conversationRepo.completedConversation(conversation);

            return {
                response,
                nextStepId: null
            } as WorkflowExecutionResult;
        }

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