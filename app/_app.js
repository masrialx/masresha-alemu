// pages/_app.js
import Head from "next/head";
import "../styles/globals.css"; // Your global styles

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/logos1.png" />
        {/* You can also specify the type if necessary */}
        {/* <link rel="icon" href="/icon.png" type="image/png" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
