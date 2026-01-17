import { v4 as uuidv4 } from 'uuid';

export class User {

    id: string;
    name: string;
    email: string;
    number: string;

    constructor(id: string, name: string, email: string, number: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.number = number;
    }

    static create(name: string, email: string, number: string): User {
        return new User(
            uuidv4(),
            name,
            email,
            number
        );
    }
    static fromId(userId: string): User {
        return new User(
            userId,
            "",
            "",
            ""
        );
    }
}