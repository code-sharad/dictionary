"use client"
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"] });

import { useRef, useState } from "react"

function InputField({ setword: setword }: { setword: (word: string) => void }) {
    const [inputword, setinputword] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null);
    inputRef.current?.addEventListener('keydown', (e) => e.key === 'Enter' && setword(inputRef.current?.value || ""))
    return (
        <div className={`bg-[#f4f4f4] dark:bg-gray-800 py-2 lg:py-4 px-2 lg:px-4 w-full border-4 border-gray-200 dark:border-gray-700 ${inputRef.current?.focus ? '' : "border-none"} flex justify-between items-center rounded-lg gap-8 `}>
            <input placeholder=" find the meaning..." ref={inputRef} type='text' value={inputword} onChange={(e) => setinputword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setword(inputword)} className={`border-2 selection:bg-violet-100 dark:selection:bg-violet-700 bg-white dark:bg-gray-900 dark:border-gray-800 active:border-violet-500 ${playfair.className} text-3xl lg:text-5xl w-full outline-none px-4 py-2 rounded-lg transition-all duration-300`} />

        </div>
    )
}


function SearchIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
}
export default InputField