import { queryExecutionClient, QueryResult} from '@dynatrace-sdk/client-query';
import { useState,useEffect } from 'react';




export const useDQLQuery = (query: string): [QueryResult | undefined, boolean] => {
  const [result, setResult] = useState<QueryResult>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
  
    setIsLoading(true);
    queryExecutionClient
      .queryExecute({
        body: {
          query,
          requestTimeoutMilliseconds: 30000,
        },
        abortSignal,
      })
      .then((res) => setResult(res.result))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  
    return () => {
      abortController.abort();
    };
  }, [query]);

  return [result, isLoading];
};

