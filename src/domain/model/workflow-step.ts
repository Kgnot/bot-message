import { ResponseIntent } from 'src/application/bot/response/response-intent';
import { StepTransition } from './step-transition';

/**
 * WorkflowStep domain model
 * Represents a single step in a conversation workflow
 */
export class WorkflowStep {
    constructor(
        public readonly id: string,
        public readonly response: ResponseIntent,
        public readonly transitions: StepTransition[]
    ) { }

    /**
     * Factory method to create a workflow step
     */
    static create(
        id: string,
        response: ResponseIntent,
        transitions: StepTransition[] = []
    ): WorkflowStep {
        return new WorkflowStep(id, response, transitions);
    }

    /**
     * Find the next step ID based on user input and condition evaluator
     * Returns null if no matching transition is found (end of workflow)
     */
    findNextStep(userInput: string, evaluator: ConditionEvaluator): string | null {
        for (const transition of this.transitions) {
            if (evaluator.evaluate(transition.condition, userInput)) {
                return transition.nextStepId;
            }
        }
        return null;
    }

    /**
     * Check if this step has any transitions
     */
    hasTransitions(): boolean {
        return this.transitions.length > 0;
    }

    /**
     * Check if this is a terminal step (no transitions)
     */
    isTerminal(): boolean {
        return this.transitions.length === 0;
    }
}

/**
 * Interface for condition evaluator
 * This will be implemented in the application layer
 */
export const CONDITION_EVALUATOR = Symbol('ConditionEvaluator');

export interface ConditionEvaluator {
    evaluate(condition: any, input: string): boolean;
}
