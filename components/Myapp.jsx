"use client";
import Store from "@/app/Redux/Store";
import { Provider } from "react-redux";

function MyApp({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}

export default MyApp;
