"use client"
import React, { useEffect, useState } from 'react'

function Navbar() {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark;
            
            setIsDarkTheme(initialTheme);
            document.documentElement.setAttribute('data-theme', initialTheme ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', initialTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        
        if (typeof window !== 'undefined') {
            const themeStr = newTheme ? 'dark' : 'light';
            localStorage.setItem('theme', themeStr);
            document.documentElement.setAttribute('data-theme', themeStr);
            document.documentElement.classList.toggle('dark', newTheme);
        }
    };

    return (
        <div className='flex justify-between mb-0 lg:mb-12 items-center w-full'>
            <div>
                <BookIcon />
            </div>
            <div className='flex gap-8'>
                <button
                    onClick={toggleTheme}
                    className={`transition-colors border px-2.5 py-2 rounded-full shadow focus:outline-none focus:ring-4 focus:ring-accent/50
                        ${isDarkTheme 
                            ? 'bg-neutral border-neutral text-accent hover:bg-primary-900 hover:border-accent hover:text-accent' 
                            : 'bg-primary-50 border-primary-100 text-primary-900 hover:bg-accent/10 hover:border-accent hover:text-accent'}`}
                    aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
                    tabIndex={0}
                >
                    {isDarkTheme ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </div>
    )
}

function MoonIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
}

function BookIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
}

function SunIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
}

export default Navbar