import { ArgumentMetadata, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { MENU_REPOSITORY, type MenuRepository } from 'src/application/repository/menu-repository';
import { TelegramUpdate } from '../../types/telegram-update';

@Injectable()
export class TransformTelegramUpdatePipe implements PipeTransform {
  constructor(
    @Inject(MENU_REPOSITORY)
    private readonly menuRepo: MenuRepository
  ) { }

  async transform(value: TelegramUpdate, metadata: ArgumentMetadata) {
    if (!value || !value.message || !value.message.text) {
      return value;
    }

    const text = value.message.text;
    const resolvedId = await this.menuRepo.findOptionIdByLabel(text);

    if (resolvedId) {
      console.log(`[TransformTelegramUpdatePipe] Transformed input '${text}' to '${resolvedId}'`);
      value.message.text = resolvedId;
    }

    return value;
  }
}
