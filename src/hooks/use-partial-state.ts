import { useState } from 'react';

/**
 * @author Ruby / Lasteinsa / SangpenciptaJS
 * @param initial is initial State.
 * @returns state and set state
 */
export function usePartialState<T extends Record<string, any>>(initial: T) {
  const [state, setState] = useState(initial);

  function setPartialState(value: Partial<T> | ((prev: T) => Partial<T>)) {
    if (typeof value === 'function') {
      return setState((prev) => ({ ...prev, ...value(prev) }));
    }

    return setState((prev) => ({ ...prev, ...value }));
  }

  return [state, setPartialState] as const;
}
