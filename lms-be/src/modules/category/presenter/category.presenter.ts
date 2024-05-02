import { Category } from '../entities/category.entity';
import { FileGeneralPresenter } from 'src/modules/file-general/presenter/file-general.presenter';

export class CategoryPresenter {
  id?: number;
  name?: string;
  description?: string;
  thumbnail: FileGeneralPresenter;
  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
export class CategoryDetailPresenter {
  id?: number;
  name?: string;
  description?: string;
  thumbnail: FileGeneralPresenter;
  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
