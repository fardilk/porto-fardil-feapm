import { useEffect, useState } from 'react';
import { usePartialState } from './use-partial-state';

export type useFetchProps<L> = {
  manual?: boolean;
  afterFetch?: (param?: L) => Promise<void>;
};

/**
 * @author Ruby / Lasteinsa / SangpenciptaJS
 * @param asyncFunction async function parameter
 * @param options arguments
 * @returns data from async function, isLoading as state loading, and isError if error occured
 */
export function useFetch<T, R>(
  params: R,
  fetch: (data: R) => Promise<T>,
  options?: useFetchProps<T>
) {
  const [newParam, setNewParam] = useState(params);

  const [state, setState] = usePartialState<{
    data: T | undefined;
    isLoading: boolean;
    error: boolean;
  }>({ data: undefined, error: false, isLoading: false });

  // eslint-disable-next-line
  const load = async (param: R) => {
    setState({ error: false });
    try {
      if (!state.isLoading) {
        setState({ data: undefined, isLoading: true, error: false });
        const data = await fetch(param);

        setState({ data });

        if (options?.afterFetch) {
          await options.afterFetch(data);
        }

        return data;
      }
    } catch (error) {
      setState({ error: true });
    } finally {
      setState({ isLoading: false });
    }
  };

  useEffect(() => {
    if (!options?.manual) {
      load(params);
    }
    // eslint-disable-next-line
  }, [options?.manual]);

  const refetch = async (param?: R) => {
    setNewParam(param || params);
    return await load(param || params);
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    isError: state.error,
    params: newParam,
    refetch,
  };
}
