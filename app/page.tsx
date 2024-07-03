"use client"
import React, { useEffect, useState } from 'react'

import Navbar from "./components/Navbar";
import InputField from "./components/InputField";
import WordInfo from "./components/WordInfo";

export default function Home() {
  const [word, setword] = useState("");

  return (
    <main className={` dark:bg-black flex gap-6 min-h-screen max-w-[900px] mx-auto flex-col items-center selection:rounded-lg selection:bg-violet-100 justify-between px-4 py-8 lg:p-24`}>
      <Navbar />
      <InputField setword={setword} />
      <WordInfo word={word} />
    </main>
  );
}
