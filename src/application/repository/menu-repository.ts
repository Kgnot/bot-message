import { Menu } from "src/domain/model/menu";

export const MENU_REPOSITORY = Symbol('MenuRepository');

export interface MenuRepository {
    getById(id: string): Promise<Menu | null>;
    findOptionIdByLabel(label: string): Promise<string | null>;
}
