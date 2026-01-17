import { ShowText, ShowMenu, AskConfirmation, AskInput, ShowSurvey, EndConversation } from "../types/bot.response-types";

// Esto es la intención conversacional del negocio
export type ResponseIntent =
    | ShowText
    | ShowMenu
    | AskConfirmation
    | AskInput
    | ShowSurvey
    | EndConversation;
