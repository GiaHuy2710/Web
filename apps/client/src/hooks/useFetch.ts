import { useState, useEffect, useCallback } from 'react';

export interface UseFetchOptions {
  autoFetch?: boolean;
}

export function useFetch<T>(fetchFn: () => Promise<T>, options: UseFetchOptions = { autoFetch: true }) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(options.autoFetch ?? true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      return result;
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (options.autoFetch) {
      execute();
    }
  }, [execute, options.autoFetch]);

  return { data, isLoading, error, refetch: execute };
}
