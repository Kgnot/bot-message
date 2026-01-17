/**
 * Transition condition types
 */
export type TransitionCondition =
    | EqualsCondition
    | RegexCondition
    | AnyCondition;

export interface EqualsCondition {
    type: 'EQUALS';
    value: string;
}

export interface RegexCondition {
    type: 'REGEX';
    pattern: string;
}

export interface AnyCondition {
    type: 'ANY';
}

/**
 * StepTransition domain model
 * Represents a transition from one step to another based on a condition
 */
export class StepTransition {
    constructor(
        public readonly condition: TransitionCondition,
        public readonly nextStepId: string
    ) { }

    /**
     * Factory method to create a transition
     */
    static create(
        condition: TransitionCondition,
        nextStepId: string
    ): StepTransition {
        return new StepTransition(condition, nextStepId);
    }

    /**
     * Create an EQUALS condition transition
     */
    static createEquals(value: string, nextStepId: string): StepTransition {
        return new StepTransition(
            { type: 'EQUALS', value },
            nextStepId
        );
    }

    /**
     * Create a REGEX condition transition
     */
    static createRegex(pattern: string, nextStepId: string): StepTransition {
        return new StepTransition(
            { type: 'REGEX', pattern },
            nextStepId
        );
    }

    /**
     * Create an ANY condition transition (always matches)
     */
    static createAny(nextStepId: string): StepTransition {
        return new StepTransition(
            { type: 'ANY' },
            nextStepId
        );
    }
}
