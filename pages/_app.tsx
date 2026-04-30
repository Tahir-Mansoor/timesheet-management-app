import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
      `}</style>

      <Component {...pageProps} />
    </>
  );
}