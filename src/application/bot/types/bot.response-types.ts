export interface ShowText {
    type: 'TEXT';
    textKey: string;
}

export interface ShowMenu {
    type: 'MENU';
    menuId: 'MAIN_MENU';
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
