"use client"
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"] });

import { useRef, useState } from "react"

function InputField({ setword: setword }: { setword: (word: string) => void }) {
    const [inputword, setinputword] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setword(inputRef.current?.value || "")
        }
    };

    return (
        <div className={`py-2 lg:py-4 px-2 lg:px-4 w-full border-4 transition-colors duration-300
            bg-primary-50 border-primary-100
            dark:bg-neutral dark:border-primary-900
            flex justify-between items-center rounded-lg gap-8`}>
            <input 
                placeholder="find the meaning..." 
                ref={inputRef} 
                type='text' 
                value={inputword} 
                onChange={(e) => setinputword(e.target.value)} 
                onKeyDown={handleKeyDown}
                className={`border-2 selection:bg-accent/50 dark:selection:bg-accent/50 
                    bg-primary-50 border-primary-200
                    dark:bg-primary-900 dark:border-primary-700 
                    active:border-accent 
                    ${playfair.className} text-3xl lg:text-5xl w-full outline-none px-4 py-2 rounded-lg transition-all duration-300`} 
            />
        </div>
    )
}

function SearchIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
}

export default InputField