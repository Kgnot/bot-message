import { ShowText, ShowMenu, AskConfirmation, AskInput, ShowSurvey, EndConversation } from "../types/bot.response-types";

// Esto es la intención conversacional del negocio
export type BotResponse =
    | ShowText
    | ShowMenu
    | AskConfirmation
    | AskInput
    | ShowSurvey
    | EndConversation;
