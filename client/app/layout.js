import "./globals.css";
import Header from "./_components/layout/Header/Header";
import Footer from "./_components/layout/Footer/Footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import Script from "next/script";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'The Pizza Inn | Order online now',
  description: 'Discover the best pizza , Convenient online ordering, quick service, and unbeatable taste. Order now',
}


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
  
      <head>
    <meta charSet="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="msvalidate.01" content="23983C217832B5C4AAC786882981CDA6" />

  </head>


      <body >
        <StoreProvider>
          <Header />
          <div className="pt-36">{children}</div>
          <Toaster position="top-right" richColors duration={1000} />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
