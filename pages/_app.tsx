import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/authContext';
import { PersistentLayout } from '../layouts/PersistentLayout';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Mokytojams</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" reverseOrder={false} />

      <AuthProvider>
        <PersistentLayout>
          <Component {...pageProps} />
        </PersistentLayout>
      </AuthProvider>
    </>
  );
}
