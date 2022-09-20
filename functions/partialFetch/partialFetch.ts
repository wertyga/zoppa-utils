import { wait } from '../common';
import { Error, HandlerType, Options, Result } from './types';

export const partialFetch = async <EN = any, FR = any>(
  map: EN[],
  handler: HandlerType<EN, FR>,
  options: Options<EN, FR> = {} as Options<EN, FR>
): Promise<Result<EN, FR>> => {
  let page = 0;
  const {
    onProcess = () => {},
    onError = () => {},
    partial = 1,
    timeout = 100,
  } = options;
  const maxPage = Math.ceil(map.length / partial);
  const errors: Error<EN>[] = [];
  const result: FR[] = [];

  while (page <= maxPage) {
    let currentEntities;
    try {
      currentEntities = map
        .slice(page * partial, page * partial + partial)
        .map(entity => entity);
      const data = await Promise.all(
        currentEntities.map(entity => {
          return handler(entity);
        })
      );
      result.push(...data);
    } catch (e) {
      onError(e);
      errors.unshift(
        ...currentEntities.map(en => ({ entity: en, msg: e.message }))
      );
    } finally {
      page += 1;
      await wait(timeout);
      onProcess(result, errors, () => {
        page = maxPage + 1;
      });
    }
  }

  return {
    errors,
    result,
  };
};
