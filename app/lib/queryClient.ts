import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Reintentar 2 veces si falla
      staleTime: 5 * 60 * 1000, // Datos frescos por 5 minutos
      gcTime: 10 * 60 * 1000, // Mantener en cache 10 minutos (antes era cacheTime)
    },
    mutations: {
      retry: 1,
    },
  },
});