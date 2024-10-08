import { Inter } from "next/font/google";
import "@/app/styles/globals.scss";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { Provider } from "react-redux";
import MyApp from "@/Components/Myapp";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marksheet",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <MyApp>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="wrapper">
            <Sidebar />
            <div className="right-side">
              <Header />
              <div className="">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </MyApp>
  );
}
