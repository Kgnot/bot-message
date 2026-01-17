import { Document } from 'mongoose';

export type WorkflowMongoDocument = WorkflowDocument & Document;


export interface WorkflowDocument {
    _id: string;  // Workflow ID
    name: string;
    description: string;
    firstStepId: string;
    isActive: boolean;
    steps: StepDocument[];  // Embedded documents
    createdAt: Date;
    updatedAt: Date;
}
export interface StepDocument {
    id: string;
    response: {
        type: string;
        [key: string]: any;  // Dynamic response config
    };
    transitions: TransitionDocument[];
}
export interface TransitionDocument {
    condition: {
        type: 'EQUALS' | 'REGEX' | 'ANY';
        value?: string;
        pattern?: string;
    };
    nextStepId: string;
}