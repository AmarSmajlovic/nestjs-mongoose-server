"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { authService } from "@/services/auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const onTest = async () => {
    const res = await authService.test();
    console.log(res);
  };

  return (
    <main className={styles.main}>
      <button onClick={onTest}>test</button>
    </main>
  );
}
