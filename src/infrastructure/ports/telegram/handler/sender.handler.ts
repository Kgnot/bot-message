import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { I18nService } from "src/infrastructure/i18n/i18n.service";
import { Inject, Injectable } from "@nestjs/common";
import { MENU_REPOSITORY, type MenuRepository } from "src/application/repository/menu-repository";

@Injectable()
export class SenderHandler {

    constructor(
        private readonly http: HttpService,
        private readonly i18n: I18nService,
        @Inject(MENU_REPOSITORY)
        private readonly menuRepo: MenuRepository
    ) { }

    async sendText(url: string, chatId: string, text: string) {
        await firstValueFrom(
            this.http.post(url, {
                chat_id: chatId,
                text: text,
            }),
        );
    }

    async sendMenu(url: string, chatId: string, menuId: string, dynamicText?: string) {
        const menu = await this.menuRepo.getById(menuId);
        if (!menu) {
            console.error(`Menu with ID ${menuId} not found in repository`);
            // If we have dynamic text but no options (because repo failed), send just text
            if (dynamicText) {
                await this.sendText(url, chatId, dynamicText);
            } else {
                await this.sendText(url, chatId, "Menu not found");
            }
            return;
        }

        const textToSend = dynamicText || (menu.textKey ? this.i18n.getText(menu.textKey) : 'Menu');

        await firstValueFrom(
            this.http.post(url, {
                chat_id: chatId,
                text: textToSend,
                reply_markup: {
                    keyboard: menu.options.map(o => [o.label]),
                    resize_keyboard: true,
                    one_time_keyboard: false,
                },
            }),
        );
    }

    async sendDynamicMenu(url: string, chatId: string, text: string, options: string[]) {
        await firstValueFrom(
            this.http.post(url, {
                chat_id: chatId,
                text: text,
                reply_markup: {
                    keyboard: options.map(o => [o]),
                    resize_keyboard: true,
                    one_time_keyboard: false,
                },
            }),
        );
    }

    async sendAskInput(url: string, chatId: string, prompt: string) {
        await firstValueFrom(
            this.http.post(url, {
                chat_id: chatId,
                text: prompt,
                reply_markup: {
                    remove_keyboard: true, // Remove previous keyboard
                },
            }),
        );
    }

    async sendAskConfirmation(url: string, chatId: string, message: string) {
        await firstValueFrom(
            this.http.post(url, {
                chat_id: chatId,
                text: message,
                reply_markup: {
                    keyboard: [['Sí'], ['No']],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            }),
        );
    }

}