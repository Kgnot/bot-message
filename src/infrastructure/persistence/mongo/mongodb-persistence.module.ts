import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WorkflowSchema } from "./schemas/workflow.schemas";
import { MongoDBWorkflowRepository } from "./repository/mongodb-workflow-repository";
import { WORKFLOW_REPOSITORY } from "src/application/repository/workflow-repository";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Workflow', schema: WorkflowSchema },
        ]),
    ],
    providers: [
        {
            provide: WORKFLOW_REPOSITORY,
            useClass: MongoDBWorkflowRepository,
        },
    ],
    exports: [WORKFLOW_REPOSITORY],
})
export class MongoDBPersistenceModule { }

