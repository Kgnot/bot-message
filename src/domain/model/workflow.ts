import { WorkflowStep } from "./workflow-step";

/**
 * Workflow domain model
 * Represents a complete conversation workflow with multiple steps
 */
export class Workflow {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly firstStepId: string,
        public readonly steps: Map<string, WorkflowStep>,
        public readonly isActive: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) { }

    /**
     * Factory method to create a new workflow
     */
    static create(
        id: string,
        name: string,
        description: string,
        firstStepId: string
    ): Workflow {
        return new Workflow(
            id,
            name,
            description,
            firstStepId,
            new Map(),
            true,
            new Date(),
            new Date()
        );
    }

    /**
     * Add a step to the workflow
     */
    addStep(step: WorkflowStep): void {
        this.steps.set(step.id, step);
    }

    /**
     * Get a step by ID
     */
    getStep(stepId: string): WorkflowStep | undefined {
        return this.steps.get(stepId);
    }

    /**
     * Check if workflow has a specific step
     */
    hasStep(stepId: string): boolean {
        return this.steps.has(stepId);
    }

    /**
     * Get all step IDs
     */
    getStepIds(): string[] {
        return Array.from(this.steps.keys());
    }

    /**
     * Deactivate the workflow
     */
    deactivate(): void {
        (this as any).isActive = false;
        (this as any).updatedAt = new Date();
    }

    /**
     * Activate the workflow
     */
    activate(): void {
        (this as any).isActive = true;
        (this as any).updatedAt = new Date();
    }
}
