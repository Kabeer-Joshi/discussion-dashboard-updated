// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
'use client';

import {TanstackQueryProvider} from './tanstack-query-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <TanstackQueryProvider>
          {children}
          <Toaster richColors />
          <ProgressBar
            height="4px"
            color="#0d2ee3"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </TanstackQueryProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
