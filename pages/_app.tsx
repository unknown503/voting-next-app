import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { SessionProvider } from "next-auth/react"
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  // const { store, props } = wrapper.useWrappedStore(pageProps);
  return <>
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            transition={Flip}
            limit={3}
          />
        </Layout>
      </Provider>
    </SessionProvider>
  </>
}
