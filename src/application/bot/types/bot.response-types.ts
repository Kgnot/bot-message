export interface ShowText {
    type: 'TEXT';
    text: string;
}

export interface ShowMenu {
    type: 'MENU';
    menuId: string;
    text?: string;
    options?: string[];
}

export interface AskInput {
    type: 'ASK_INPUT';
    inputKey: string;
    prompt: string;
}

export interface AskConfirmation {
    type: 'ASK_CONFIRMATION';
    confirmationKey: string;
    message: string;
}

export interface ShowSurvey {
    type: 'SURVEY';
    surveyId: 'NPS_2026';
}

export interface EndConversation {
    type: 'END_CONVERSATION';
}
