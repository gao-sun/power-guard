import guard from './guard';
import guardArray, { guardArrayNotEmpty } from '../array';
import { GuardClass, GuardFunctionWithArray, OptionalGuardFunctionWithArray } from '../global';

export type BooleanMode = 'normal' | 'loose' | 'strict';

class BooleanGuard implements GuardClass<boolean> {
  private mode: BooleanMode;

  get required() {
    const { mode } = this;
    const test: GuardFunctionWithArray<boolean> = function (x: unknown) {
      return guard(x, mode);
    };

    test.array = guardArray((x) => guard(x, mode));
    test.arrayNotEmpty = guardArrayNotEmpty((x) => guard(x, mode));

    return test;
  }

  get optional() {
    const { mode } = this;
    const test: OptionalGuardFunctionWithArray<boolean> = function (x: unknown) {
      return guard(x, true, mode);
    };

    test.array = guardArray((x) => guard(x, mode), true);

    return test;
  }

  get loose() {
    return new BooleanGuard('loose');
  }

  get strict() {
    return new BooleanGuard('strict');
  }

  constructor(mode: BooleanMode = 'normal') {
    this.mode = mode;
  }
}

export default new BooleanGuard();
