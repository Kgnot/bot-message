import { Message } from "./message";
import { User } from "./user";
import { v4 as uuidv4 } from 'uuid';
import { State } from "./state";

export class Conversation {
    id: string;
    user: User;
    messages: Message[];
    state: State;
    context: Map<string, any>;

    constructor(id: string, user: User, messages: Message[], state: State, context?: Map<string, any>) {
        this.id = id;
        this.user = user;
        this.messages = messages;
        this.state = state;
        this.context = context || new Map<string, any>();
    }

    /**
     * Business rule: Validate state transitions
     * Defines which state transitions are valid in the conversation flow
     */
    public canTransitionTo(newState: State): boolean {
        const validTransitions: Record<State, State[]> = {
            [State.IDLE]: [State.START],
            [State.START]: [State.MENU],
            [State.MENU]: [State.TRIAGE, State.COMPLETED],
            [State.TRIAGE]: [State.COLLECTING_NAME],
            [State.COLLECTING_NAME]: [State.COLLECTING_REASON],
            [State.COLLECTING_REASON]: [State.CONFIRMATION],
            [State.APPOINTMENT]: [State.CONFIRMATION],
            [State.CONFIRMATION]: [State.COMPLETED, State.MENU],
            [State.COMPLETED]: [State.MENU, State.START]
        };

        const allowedStates = validTransitions[this.state] || [];
        return allowedStates.includes(newState);
    }

    /**
     * Transition to a new state with validation
     * @throws Error if transition is invalid
     */
    public transitionTo(newState: State): void {
        if (!this.canTransitionTo(newState)) {
            throw new Error(`Invalid state transition from ${this.state} to ${newState}`);
        }
        this.state = newState;
    }

    /**
     * Store context data for the conversation
     */
    public setContextData(key: string, value: any): void {
        this.context.set(key, value);
    }

    /**
     * Retrieve context data from the conversation
     */
    public getContextData(key: string): any {
        return this.context.get(key);
    }

    /**
     * Check if context data exists
     */
    public hasContextData(key: string): boolean {
        return this.context.has(key);
    }

    public addMessage(message: Message): void {
        this.messages.push(message);
    }

    public static create(user: User): Conversation {
        return new Conversation(
            uuidv4(),
            user,
            [],
            State.START,
            new Map<string, any>()
        );
    }
}