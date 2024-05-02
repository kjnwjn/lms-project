export class FileGeneralPresenter {
  id: number;
  path: string;
  type: string;
  size: number;

  constructor(partial: Partial<FileGeneralPresenter>) {
    Object.assign(this, partial);
  }
}
