import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseIntent } from "src/application/bot/response/response-intent";
import { WorkflowRepository } from "src/application/repository/workflow-repository";
import { StepTransition, TransitionCondition } from "src/domain/model/step-transition";
import { Workflow } from "src/domain/model/workflow";
import { WorkflowStep } from "src/domain/model/workflow-step";
import { WorkflowMongoDocument } from "../schemas/workflow.schemas-interfaces";

@Injectable()
export class MongoDBWorkflowRepository implements WorkflowRepository {
    constructor(
        @InjectModel('Workflow') private readonly workflowModel: Model<WorkflowMongoDocument>
    ) { }

    async findById(id: string): Promise<Workflow | null> {
        const doc = await this.workflowModel.findOne({
            _id: id,
            isActive: true
        }).exec();

        if (!doc) return null;

        return this.toDomain(doc);
    }

    async findAll(): Promise<Workflow[]> {
        const docs = await this.workflowModel.find({
            isActive: true
        }).exec();

        return docs.map(doc => this.toDomain(doc));
    }

    async save(workflow: Workflow): Promise<void> {
        const doc = this.toDocument(workflow);

        await this.workflowModel.updateOne(
            { _id: workflow.id },
            { $set: doc },
            { upsert: true }
        ).exec();
    }

    async delete(id: string): Promise<void> {
        await this.workflowModel.updateOne(
            { _id: id },
            { $set: { isActive: false, updatedAt: new Date() } }
        ).exec();
    }

    private toDomain(doc: WorkflowMongoDocument): Workflow {
        const steps = new Map<string, WorkflowStep>();

        doc.steps.forEach(stepDoc => {
            const transitions = stepDoc.transitions.map(t =>
                StepTransition.create(
                    this.mapCondition(t.condition),
                    t.nextStepId
                )
            );

            const step = WorkflowStep.create(
                stepDoc.id,
                stepDoc.response as ResponseIntent,
                transitions
            );

            steps.set(step.id, step);
        });

        return new Workflow(
            doc._id,
            doc.name,
            doc.description,
            doc.firstStepId,
            steps,
            doc.isActive,
            doc.createdAt,
            doc.updatedAt
        );
    }

    private toDocument(workflow: Workflow) {
        const steps = Array.from(workflow.steps.values()).map(step => ({
            id: step.id,
            response: step.response,
            transitions: step.transitions.map(t => ({
                condition: t.condition,
                nextStepId: t.nextStepId
            }))
        }));

        return {
            _id: workflow.id,
            name: workflow.name,
            description: workflow.description,
            firstStepId: workflow.firstStepId,
            isActive: workflow.isActive,
            steps,
            updatedAt: new Date()
        };
    }

    private mapCondition(condition: any): TransitionCondition {
        switch (condition.type) {
            case 'EQUALS':
                return { type: 'EQUALS', value: condition.value };
            case 'REGEX':
                return { type: 'REGEX', pattern: condition.pattern };
            case 'ANY':
                return { type: 'ANY' };
            default:
                return { type: 'ANY' };
        }
    }
}
