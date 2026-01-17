import { Message } from "./message";
import { User } from "./user";
import { v4 as uuidv4 } from 'uuid';
import { State } from "./state";

export class Conversation {
    id: string;
    user: User;
    messages: Message[];
    state: State;

    constructor(id: string, user: User, messages: Message[], state: State) {
        this.id = id;
        this.user = user;
        this.messages = messages;
        this.state = state;
    }



    public addMessage(message: Message): void {
        this.messages.push(message);
    }

    public static create(user: User): Conversation {
        return new Conversation(
            uuidv4(),
            user,
            [],
            State.START
        );
    }
}