import { Injectable } from "@nestjs/common";
import { MenuRepository } from "src/application/repository/menu-repository";
import { Menu } from "src/domain/model/menu";

@Injectable()
export class MongoMenuRepository implements MenuRepository {
    async getById(id: string): Promise<Menu | null> {
        // TODO: Implement Mongo connection
        console.warn("MongoMenuRepository not implemented, returning null");
        return null;
    }
}
