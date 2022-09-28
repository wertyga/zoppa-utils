export type HandlerType<EN = any, FR = any> = (entity: EN) => Promise<FR>;

export type Error<EN = any> = { entity: EN; msg: string };

export type Options<EN = any, FR = any> = {
  onProcess?: (result: FR[], errors: Error<EN>[], setStop: () => void) => any;
  onError?: (e: any) => void;
  partial?: number;
  timeout?: number;
};

export type Result<EN = any, FR = any> = {
  errors: Error<EN>[];
  result: FR[];
};
