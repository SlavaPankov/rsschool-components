/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import '@/styles/globals.css';
import { Loader } from '@/components/Loader';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { Fallback } from '@/components/Fallback';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<Fallback />}>
        <Loader />
        <Component {...props.pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}
