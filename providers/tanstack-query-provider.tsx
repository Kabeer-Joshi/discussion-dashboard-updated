'use client';
// import * as Sentry from '@sentry/browser';
import React, { useState } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

export const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: (err, query) => {
            if ((err as any)?.response?.status !== 401) {
            //   Sentry.captureMessage('Query ERROR');
            //   Sentry.captureException(err?.message);
              toast.error('Something went wrong' + err?.message);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (err, mutation) => {
            // can add mutation top level error toast here to show err?.message
            // Sentry.captureMessage('Mutation Error');
            // Sentry.captureException(err?.message);
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
