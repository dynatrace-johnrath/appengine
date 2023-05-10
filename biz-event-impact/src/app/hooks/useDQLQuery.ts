import { queryExecutionClient, QueryResult} from '@dynatrace-sdk/client-query';
import { useState,useEffect } from 'react';

//Hook for executing DQL Queries Returns Result and Loading State
export const useDQLQuery = (query: string): [QueryResult | undefined, boolean] => {
  //Initialize State object to return to calling component
  const [result, setResult] = useState<QueryResult>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  //Trigger something to happen
  useEffect(() => {
    //Setup Signal needed for queryExecution
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    //set loading state to true while we wait for the query
    setIsLoading(true);
    //leverage the queryExecution client to run DQL
    queryExecutionClient
      .queryExecute({
        body: {
          query,
          requestTimeoutMilliseconds: 30000,
        },
        abortSignal,
      })
      .then((res) => setResult(res.result)) //set result
      .catch((e) => console.error(e)) // catch any errors
      .finally(() => setIsLoading(false)); //set loading to finished
  
    return () => {
      abortController.abort();
    };

  }, [query]); //query is the parameter the event needs

  return [result, isLoading];
};

