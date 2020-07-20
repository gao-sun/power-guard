import throwError from './error';
import { isObject } from './types';
import { GuardFunction } from './global';

type DataConfig = {
  [key: string]: GuardFunction<unknown>;
};

type GuardedData<T extends DataConfig> = {
  [key in keyof T]: ReturnType<T[key]>;
};

export const guard = <T extends DataConfig>(config: T): GuardFunction<GuardedData<T>> => (
  data: unknown,
) => {
  if (!isObject(data)) {
    return throwError('Expecting object data');
  }

  const guarded = {} as GuardedData<T>;

  (Object.keys(config) as Array<keyof T>).forEach((key) => {
    // @ts-ignore
    const value = data[key];

    guarded[key] = config[key](value) as ReturnType<T[typeof key]>;
  });

  return guarded;
};

export default guard;

export * from './global';

export { default as throwError } from './error';

export { default as array } from './array';

export { default as boolean } from './boolean';

export { default as enumGuard } from './enum';

export { default as number } from './number';

export { default as string } from './string';
