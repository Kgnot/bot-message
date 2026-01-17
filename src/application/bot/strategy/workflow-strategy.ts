import { Inject, Injectable } from "@nestjs/common";
import type { WorkflowRepository } from "src/application/repository/workflow-repository";
import { WORKFLOW_REPOSITORY } from "src/application/repository/workflow-repository";
import { WorkflowEngine, WorkflowExecutionResult } from "../conversation/workflow-engine";
import { ConversationStrategy } from "./conversation-strategy.interface";
import { Conversation } from "src/domain/model/conversation";
import { ResponseIntent } from "../response/response-intent";

@Injectable()
export class WorkflowStrategy implements ConversationStrategy {
    constructor(
        @Inject(WORKFLOW_REPOSITORY)
        private readonly workflowRepository: WorkflowRepository,
        private readonly workFlowEngine: WorkflowEngine
    ) { }

    async execute(
        conversation: Conversation,
        userInput: string
    ): Promise<ResponseIntent> {
        const workflowId =
            conversation.getContextData("workflowId") || process.env.WORKFLOW_ID;

        const currentStepId =
            conversation.getContextData("currentStepId") || null;

        const workflow = await this.workflowRepository.findById(workflowId);

        if (!workflow) {
            throw new Error(`Workflow ${workflowId} not found`);
        }

        const result: WorkflowExecutionResult = await this.workFlowEngine.execute(
            workflow,
            currentStepId,
            conversation,
            userInput
        );

        if (result.nextStepId) {
            conversation.setContextData("currentStepId", result.nextStepId);
        }
        console.log("result.response | WorkflowStrategy", result.response); // la respusta es 
        return result.response;
    }

    getName(): string {
        return "WORKFLOW";
    }
}
