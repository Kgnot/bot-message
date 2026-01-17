import { Message } from "./message";
import { User } from "./user";
import { v4 as uuidv4 } from 'uuid';

export class Conversation {
    id: string;
    user: User;
    messages: Message[];

    constructor(id: string, user: User, messages: Message[]) {
        this.id = id;
        this.user = user;
        this.messages = messages;
    }



    public addMessage(message: Message): void {
        this.messages.push(message);
    }

    public static create(user: User): Conversation {
        return new Conversation(
            uuidv4(),
            user,
            []
        );
    }
}