"use client"
import React, { useState } from 'react'
import { Playfair_Display } from 'next/font/google'


import Navbar from "./components/Navbar";
import InputField from "./components/InputField";
import WordInfo from "./components/WordInfo";
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ["latin"] });
export default function Home() {
  const [word, setword] = useState("");

  return (
    <main className={`flex gap-6 min-h-screen max-w-[900px] mx-auto flex-col items-center selection:rounded-lg selection:bg-accent/40 dark:selection:bg-accent/60 justify-between px-4 py-8 lg:p-24 bg-primary-50 text-primary-900 dark:bg-neutral dark:text-primary-100`}>
      <Navbar />
      <InputField setword={setword} />
      <WordInfo word={word} />

      <div>
        <p className='text-secondary-500 dark:text-accent text-center'>Made with <span className='text-accent'>❤️</span> by <Link target='_blank' href='https://sharad31.vercel.app' className={`${playfair.className} text-accent dark:text-secondary-200 font-semibold `}>Sharad Bhadait</Link></p>
      </div>
    </main>
  );
}
