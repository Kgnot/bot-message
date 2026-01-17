import { v4 as uuidv4 } from 'uuid';

export class Message {
    id: string;
    content: string;
    sender: string;
    timestamp: Date;

    constructor(id: string, content: string, sender: string, timestamp: Date) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.timestamp = timestamp;
    }

    static create(content: string): Message {
        return new Message(
            uuidv4(),
            content,
            "System",
            new Date()
        );
    }

    static fromUser(userId: string, content: string): Message {
        return new Message(
            uuidv4(),
            content,
            userId,
            new Date()
        );
    }
}