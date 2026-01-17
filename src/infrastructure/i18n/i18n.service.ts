import { Injectable } from "@nestjs/common";
import { TEXTS_ES } from "./texts.es";

@Injectable()
export class I18nService {
    getText(key: string): string {
        return TEXTS_ES[key] ?? key;
    }
}