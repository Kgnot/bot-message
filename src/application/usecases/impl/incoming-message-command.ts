export class IncomingMessageCommand {
    constructor(
        public readonly userId: string,
        public readonly text: string,
        public readonly channel: 'telegram',
    ) { }
}