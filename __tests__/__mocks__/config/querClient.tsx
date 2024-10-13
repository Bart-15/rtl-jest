import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }); // and other config here
}

export const testQueryClient = generateQueryClient();

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return render(
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>,
  );
};
