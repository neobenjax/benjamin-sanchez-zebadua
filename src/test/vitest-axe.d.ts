import 'vitest';
import { AxeResults } from 'axe-core';

declare module 'vitest' {
  export interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
}
