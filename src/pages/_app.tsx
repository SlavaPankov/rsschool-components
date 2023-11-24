/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import '@/styles/globals.css';
import { Loader } from '@/components/Loader';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Loader />
      <Component {...props.pageProps} />
    </Provider>
  );
}
