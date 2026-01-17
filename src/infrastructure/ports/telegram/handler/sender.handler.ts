import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { MAIN_MENU } from "src/infrastructure/ui/menus";
import { I18nService } from "src/infrastructure/i18n/i18n.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SenderHandler {

    constructor(private readonly http: HttpService, private readonly i18n: I18nService) {

    }

    async sendText(url: string, chatId: string, text: string) {
        await firstValueFrom(
            this.http.post(url, {
                chat_id: chatId,
                text: text,
            }),
        );
    }

    async sendMenu(url: string, chatId: string, menuId: string) {
        const menu = MAIN_MENU[menuId];

        await firstValueFrom(
            this.http.post(url, {
                chat_id: chatId,
                text: this.i18n.getText(menu.textKey),
                reply_markup: {
                    keyboard: menu.options.map(o => [this.i18n.getText(o)]),
                    resize_keyboard: true,
                },
            }),
        );
    }

}