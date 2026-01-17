export interface SendMessageBroadcast {
    execute(message: string): Promise<void>;
}