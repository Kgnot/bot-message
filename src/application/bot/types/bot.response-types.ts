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
    field: 'EMAIL' | 'PHONE';
}

export interface AskConfirmation {
    type: 'CONFIRM';
    questionKey: 'DELETE_ACCOUNT';
}

export interface ShowSurvey {
    type: 'SURVEY';
    surveyId: 'NPS_2026';
}

export interface EndConversation {
    type: 'END_CONVERSATION';
}
