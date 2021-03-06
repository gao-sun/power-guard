import guard from './guard';
import guardArray, { guardArrayNotEmpty } from '../array';
import { GuardClass, GuardFunctionWithArray, OptionalGuardFunctionWithArray } from '../global';

type EnumType<T> = T[keyof T];

class EnumGuard<T> implements GuardClass<EnumType<T>> {
  static create<T>(enumObject: T) {
    return new EnumGuard(enumObject);
  }

  private enumObject: T;

  get required() {
    const { enumObject } = this;
    const test: GuardFunctionWithArray<EnumType<T>> = function (x: unknown) {
      return guard(enumObject, x);
    };

    test.array = guardArray((x) => guard(this.enumObject, x));
    test.arrayNotEmpty = guardArrayNotEmpty((x) => guard(this.enumObject, x));

    return test;
  }

  get optional() {
    const { enumObject } = this;
    const test: OptionalGuardFunctionWithArray<EnumType<T>> = function (x: unknown) {
      return guard(enumObject, x, true);
    };

    test.array = guardArray((x) => guard(enumObject, x), true);

    return test;
  }

  constructor(enumObject: T) {
    this.enumObject = enumObject;
  }
}

export default EnumGuard.create;
