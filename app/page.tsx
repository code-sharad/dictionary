"use client"
import React, { useEffect, useState } from 'react'
import { Playfair_Display } from 'next/font/google'


import Navbar from "./components/Navbar";
import InputField from "./components/InputField";
import WordInfo from "./components/WordInfo";
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ["latin"] });
export default function Home() {
  const [word, setword] = useState("");

  return (
    <main className={` dark:bg-black flex gap-6 min-h-screen max-w-[900px] mx-auto flex-col items-center selection:rounded-lg selection:bg-violet-100 justify-between px-4 py-8 lg:p-24`}>
      <Navbar />
      <InputField setword={setword} />
      <WordInfo word={word} />

      <div>
        <p className='text-gray-400 text-center'>Made with ❤️ by <Link target='_blank' href='https://sharad31.vercel.app' className={`${playfair.className} text-purple-500 font-semibold `}>Sharad Bhadait</Link></p>
      </div>
    </main>
  );
}
