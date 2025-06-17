'use client'
import styles from "./page.module.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/store";
import { decerment, incerment } from "@/lib/counterSlice";
export default function Home() {

  return (
  <h1>
    hello guys
  </h1>
  );
}
