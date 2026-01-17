import { User } from "../../../domain/model/user";

export interface SendMessageToUser {
    execute(message: string, user: User): Promise<void>;
}