import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { FormProvider } from "./context/FormContext";
import { AuthContextProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <MovieProvider>
          <AuthContextProvider>
            <FormProvider>{children}</FormProvider>
          </AuthContextProvider>
        </MovieProvider>
      </body>
    </html>
  );
}
