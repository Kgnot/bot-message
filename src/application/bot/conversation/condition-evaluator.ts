import { Injectable } from "@nestjs/common";
import { TransitionCondition } from "src/domain/model/step-transition";
import type { ConditionEvaluator as ConditionEvaluatorInterface } from "src/domain/model/workflow-step";

@Injectable()
export class ConditionEvaluator implements ConditionEvaluatorInterface {
    evaluate(condition: TransitionCondition, input: string): boolean {
        switch (condition.type) {
            case 'EQUALS':
                console.log("class: ConditionEvaluator | condition", condition);
                console.log("class: ConditionEvaluator | input", input);
                console.log("class: ConditionEvaluator | equals: ", input.toLowerCase().trim() === condition.value.toLowerCase());
                return input.toLowerCase().trim() === condition.value.toLowerCase();

            case 'REGEX':
                console.log("class: ConditionEvaluator | regex: ", new RegExp(condition.pattern, 'i').test(input));
                return new RegExp(condition.pattern, 'i').test(input);

            case 'ANY':
                return true;

            default:
                return false;
        }
    }
}