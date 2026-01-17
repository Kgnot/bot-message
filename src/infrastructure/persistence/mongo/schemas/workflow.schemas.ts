import { Schema } from 'mongoose';

export const TransitionSchema = new Schema(
    {
        condition: {
            type: {
                type: String,
                enum: ['EQUALS', 'REGEX', 'ANY'],
                required: true,
            },
            value: String,
            pattern: String,
        },
        nextStepId: { type: String, required: true },
    },
    { _id: false },
);

export const StepSchema = new Schema(
    {
        id: { type: String, required: true },
        response: { type: Object, required: true },
        transitions: [TransitionSchema],
    },
    { _id: false },
);

export const WorkflowSchema = new Schema({
    _id: { type: String },
    name: String,
    description: String,
    firstStepId: String,
    steps: [StepSchema],
    isActive: Boolean,
}, {
    _id: false
});

