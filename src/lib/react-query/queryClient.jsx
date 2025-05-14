import { QueryClient } from '@tanstack/react-query';

// Simplified logger for development/production
const logger = {
  log: (...args) => import.meta.env.DEV && console.log('React Query:', ...args),
  warn: (...args) => import.meta.env.DEV && console.warn('React Query:', ...args),
  error: (...args) => console.error('React Query:', ...args)
};

// React Query Client Configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.PROD,
      refetchOnMount: 'stale',
      retry: (failureCount, error) => {
        const status = error?.response?.status;
        // No retry for client errors (4xx)
        if (status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      staleTime: 7 * 60 * 1000, // 7 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes
      refetchOnReconnect: 'always',
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      structuralSharing: true,
      keepPreviousData: true,
      networkMode: 'always',
      useErrorBoundary: (error) => {
        const status = error?.response?.status;
        return status === 401 || status === 403 || status >= 500;
      },
      placeholderData: (previousData) => previousData
    },
    mutations: {
      retry: (failureCount, error) => {
        const status = error?.response?.status;
        if (status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'always',
      useErrorBoundary: (error) => {
        const status = error?.response?.status;
        return status === 401 || status === 403 || status >= 500;
      }
    }
  },
  logger: {
    log: (...args) => logger.log(...args),
    warn: (...args) => logger.warn(...args),
    error: (...args) => logger.error(...args)
  }
});

// Health check function with performance optimization
export const verifyQueryClientHealth = () => {
  if (!import.meta.env.DEV) return null;

  const queries = queryClient.getQueryCache().getAll();
  const mutations = queryClient.getMutationCache().getAll();

  return {
    activeQueries: queries.filter((q) => q.state.status === 'loading').length,
    staleQueries: queries.filter((q) => q.state.isStale).length,
    freshQueries: queries.filter((q) => !q.state.isStale).length,
    totalQueries: queries.length,
    activeMutations: mutations.filter((m) => m.state.status === 'loading').length,
    totalMutations: mutations.length,
    isFetching: queryClient.isFetching()
  };
};

// Only attach subscribers and GC in development mode
if (import.meta.env.DEV) {
  // Simplified subscription
  queryClient
    .getMutationCache()
    .subscribe((event) => logger.log('Mutation:', event.type, event.mutation?.options?.mutationKey));

  queryClient.getQueryCache().subscribe((event) => logger.log('Query:', event.type, event.query?.queryKey));

  // Run GC every 10 minutes
  setInterval(
    () => {
      const before = queryClient.getQueryCache().getAll().length;
      queryClient.getQueryCache().gc();
      const after = queryClient.getQueryCache().getAll().length;
      if (before !== after) {
        logger.log(`GC: Removed ${before - after} queries`);
      }
    },
    10 * 60 * 1000
  );
}
