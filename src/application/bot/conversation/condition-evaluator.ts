import { Injectable } from "@nestjs/common";
import { TransitionCondition } from "src/domain/model/step-transition";
import type { ConditionEvaluator as ConditionEvaluatorInterface } from "src/domain/model/workflow-step";

@Injectable()
export class ConditionEvaluator implements ConditionEvaluatorInterface {
    evaluate(condition: TransitionCondition, input: string): boolean {
        switch (condition.type) {
            case 'EQUALS':
                return input.toLowerCase().trim() === condition.value.toLowerCase();

            case 'REGEX':
                return new RegExp(condition.pattern, 'i').test(input);

            case 'ANY':
                return true;

            default:
                return false;
        }
    }
}