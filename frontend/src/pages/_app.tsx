import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { createGlobalStyle } from "styled-components";
import "tailwindcss/tailwind.css";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Head>
        <title>Tri Blocks</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
