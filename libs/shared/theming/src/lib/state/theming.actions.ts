export class Load {
  static readonly type = '[Theming] Load Theming File';
  readonly type = Load.type;

  constructor(readonly url: string) {}
}
