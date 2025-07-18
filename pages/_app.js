import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute={"class"}>
      <Toaster position="top-center" richColors />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
