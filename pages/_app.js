import React from 'react';

const MyApp = ({ Component, pageProps }) => {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
};

export default MyApp;

// default
// ==========

// import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

