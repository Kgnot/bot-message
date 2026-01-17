import { Injectable } from "@nestjs/common";
import { MenuRepository } from "src/application/repository/menu-repository";
import { Menu } from "src/domain/model/menu";

@Injectable()
export class InMemoryMenuRepository implements MenuRepository {
    private readonly menus: Map<string, Menu> = new Map();

    constructor() {
        // Seed with data requested by user
        this.save(new Menu(
            'medical_consultation_menu',
            [
                { id: "GENERAL", label: "Consulta general" },
                { id: "URGENT", label: "Urgente" },
                { id: "SPECIALIST", label: "Especialista" }
            ],
            'CONSULTATION_MENU_TITLE' // Or undefined if workflow provides text
        ));
    }

    async getById(id: string): Promise<Menu | null> {
        return this.menus.get(id) || null;
    }

    // Helper for seeding
    save(menu: Menu): void {
        this.menus.set(menu.id, menu);
    }
}
