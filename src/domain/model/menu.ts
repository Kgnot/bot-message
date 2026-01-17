export interface MenuOption {
    id: string;
    label: string;
}

export class Menu {
    constructor(
        public readonly id: string,
        public readonly options: MenuOption[],
        public readonly textKey?: string
    ) { }
}
