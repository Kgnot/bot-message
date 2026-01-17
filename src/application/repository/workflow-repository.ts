import { Workflow } from 'src/domain/model/workflow';

/**
 * Repository token for dependency injection
 */
export const WORKFLOW_REPOSITORY = Symbol('WorkflowRepository');

/**
 * Repository interface for Workflow persistence
 */
export interface WorkflowRepository {
    /**
     * Find a workflow by ID
     * @param id Workflow ID
     * @returns Workflow or null if not found
     */
    findById(id: string): Promise<Workflow | null>;

    /**
     * Find all active workflows
     * @returns Array of active workflows
     */
    findAll(): Promise<Workflow[]>;

    /**
     * Save a workflow (create or update)
     * @param workflow Workflow to save
     */
    save(workflow: Workflow): Promise<void>;

    /**
     * Delete a workflow (soft delete - marks as inactive)
     * @param id Workflow ID
     */
    delete(id: string): Promise<void>;
}
